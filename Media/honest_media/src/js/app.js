App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    console.log(App.web3Provider);
    return App.initContract();
  },

  getMetaskAccountID: function () {
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    web3.eth.getAccounts(function(err, res) {
        if (err) {
            console.log('Error:',err);
            return;
        }
        console.log('getMetaskID:',res);
        App.metamaskAccountID = res[0];

    })
},

  initContract: function() {
    $.getJSON('Honestmedia.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var HonestmediaArtifact = data;
      App.contracts.Honestmedia = TruffleContract(HonestmediaArtifact);

      // Set the provider for our contract.
      App.contracts.Honestmedia.setProvider(App.web3Provider);

      //return App.showOperational();
      return App.bindEvents();
    });
  },

  bindEvents: function(){
    App.showOperational();
    App.showArticles();
    App.showChallengesToBeRuled();
    App.getMetaskAccountID();
    console.log("In bindEvents");
    $('#button-register').on('click', App.registerAccount);
    $('#button-Add').on('click', App.addArticle);
    $('#button-display').on('click', App.displayRating);
    $(document).on('change', App.handleChangeEvent);
    $('#button-Article').on('click', App.uploadFile);
  },

  handleChangeEvent: async function(event) {
    event.preventDefault();

    App.processId = parseInt($(event.target).data('id'));
    
    if (App.processId == 1 || App.processId == 2 || App.processId == 3) {
        return await App.captureFile(event);
    }

    console.log('processId',App.processId);
  },

  showOperational: function(){

    console.log('Getting operational ...');

    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;

        return honestmediaInstance.isOperational();
      }).then(function(result) {
        isOperational = result;

        $('#TTBalance').text(isOperational);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  },


  registerAccount: function (event) {
     event.preventDefault();
      console.log("Registering Account..");
      //read address
     var addr = $('#txt-registerAddress').val();

      //read amount
     var fund = $('#txt-amountToRegister').val();

      //read account type value
     const accountType = $("#accountType :selected").text();

      var honestmediaInstance;

      if(accountType === 'Contributor') {
       web3.eth.getAccounts(function(error, accounts) {
       if (error) {
         console.log(error);
       }

        App.contracts.Honestmedia.deployed().then(function(instance) {
         honestmediaInstance = instance;

          return honestmediaInstance.registerContributor(addr, fund);
       }).then(function(result) {
         console.log(result);
         console.log("successfully added contributor");
       }).catch(function(err) {
         console.log(err.message);
       });
     });

      }

      if(accountType === 'Reader') {
       web3.eth.getAccounts(function(error, accounts) {
       if (error) {
         console.log(error);
       }

        App.contracts.Honestmedia.deployed().then(function(instance) {
         honestmediaInstance = instance;

          return honestmediaInstance.registerReader(addr, fund);
       }).then(function(result) {
         console.log(result);
         console.log("successfully added reader");
       }).catch(function(err) {
         console.log(err.message);
       });
     });

      }

      if(accountType === 'Validator') {
       web3.eth.getAccounts(function(error, accounts) {
       if (error) {
         console.log(error);
       }

        App.contracts.Honestmedia.deployed().then(function(instance) {
         honestmediaInstance = instance;

          return honestmediaInstance.registerValidator(addr, fund);
       }).then(function(result) {
         console.log(result);
         console.log("successfully added validator");
       }).catch(function(err) {
         console.log(err.message);
       });
     });

      }
    },

    displayRating: function(){
      console.log('showing rating ...');

      var honestmediaInstance;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var addr = $('#txt-displayAddress').val();

        App.contracts.Honestmedia.deployed().then(function(instance) {
          honestmediaInstance = instance;

          return honestmediaInstance.getContributorRating(addr);
        }).then(function(result) {
          rank = result;

          $('#SpanRating').text(rank);
        }).catch(function(err) {
          console.log(err.message);
        });
      });

    },

  //Function to add Article
  addArticle: async function(){
    event.preventDefault();
    var current = Date.now();
    var account = $("#txt-address").val();
    
    //For IPFS hash
    //App.articleHash = "Artcile Hash";
    App.referenceHash = "ReferenceHash";
    
    App.contracts.Honestmedia.deployed().then(function(instance) {
      return instance.addArticle(
           App.articleHash,
           App.referenceHash,
           $("#txt-articleName").val(),
           current,
           $("#txt-articleStake").val(),
           {from: account}
      );
      }).then(function(result) {
          console.log('addArticle', result);
          console.log("successfully added article.");
      }).catch(function(err) {
          console.log(err.message);
      });
  },

  showArticles: function(){
    console.log('Listing articles ...');

    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;

        return honestmediaInstance.getNumberOfArticles();
      }).then(function(result) {
        numberOfArticles = result;
        console.log("showing articles..." + numberOfArticles);
        for (i = 0; i < numberOfArticles; i++) { 
          App.showArticle(i);
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  showArticle: function(index){
    console.log("showing article no: " + index);
    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;

        return honestmediaInstance.getArticle(index);
      }).then(function(result) {
        article = result;
        console.log(article);
        var ul = document.getElementById('articleList');
        var li = document.createElement('li');
        var titleText = document.createElement('h3');
        titleText.innerHTML = article[0];
        li.appendChild(titleText);

        var dateText = document.createElement('span');
        dateText.innerHTML = "Date: " + article[1];
        li.appendChild(dateText);

        var upvoteButton = document.createElement('button');
        upvoteButton.innerHTML = "Upvotes: " + article[2];
        upvoteButton.className = "btn btn-primary";
        upvoteButton.onclick = function() {App.upvoteArticle(index);}
        li.appendChild(upvoteButton);

        var downvoteButton = document.createElement('button');
        downvoteButton.innerHTML = "Downvotes: " + article[3] ;
        downvoteButton.className = "btn btn-primary";
        downvoteButton.onclick = function() {App.downvoteArticle(index);}
        li.appendChild(downvoteButton);
        
        var div = document.createElement('div');
        div.id = "div-challenge";
        var challengeLbl = document.createElement('h4');
        challengeLbl.innerHTML = "Challenge";
        div.appendChild(challengeLbl);
        var addresslbl = document.createElement('span');
        addresslbl.innerHTML = "Reader's Address";
        div.appendChild(addresslbl);

        var addressTxt = document.createElement('input');
        addressTxt.id = "txt-readerAddress";
        div.appendChild(addressTxt);

        var br = document.createElement('br');
        div.appendChild(br);

        var prooflbl = document.createElement('span');
        prooflbl.innerHTML = "Proof";
        div.appendChild(prooflbl);

        var proofFile = document.createElement('input');
        proofFile.type = 'file';
        proofFile.id = "file-proof";
        proofFile.setAttribute('data-id', '3');
        div.appendChild(proofFile);

        var proofButton = document.createElement('button');
        proofButton.id= "btn-proof" + index;
        proofButton.className = "btn btn-primary";
        proofButton.innerHTML = "Upload";
        proofButton.onclick = function() {App.uploadFile};
        div.appendChild(proofButton);

        var br = document.createElement('br');
        div.appendChild(br);

        var stakelbl = document.createElement('span');
        stakelbl.innerHTML = "Stake";
        div.appendChild(stakelbl);
        var stakeAmount = document.createElement('input');
        stakeAmount.size = 4;
        //li.appendChild(stakeAmount);
        div.appendChild(stakeAmount);
        var ethText = document.createElement('span');
        ethText.innerHTML = "eth";
        //li.appendChild(ethText);
        div.appendChild(ethText);

        var challengeButton = document.createElement('button');
        challengeButton.innerHTML = "Challenge";
        challengeButton.className = "btn btn-primary";
        challengeButton.onclick = function() {App.challengeArticle(index, stakeAmount.textContent);}
        //li.appendChild(challengeButton);
        div.appendChild(challengeButton);
        li.appendChild(div)
        ul.appendChild(li);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  showChallengesToBeRuled: function(){
    console.log('Listing challenges ...');

    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;

        return honestmediaInstance.totalChallenges();
      }).then(function(result) {
        numberOfChallenges = result;
        
        console.log("showing challenges..." + numberOfArticles);
        for (i = 0; i < numberOfChallenges; i++) {
          if (honestmediaInstance.isChallengeRuled(i)){
            App.showChallengeToBeRuled(i);
          }   
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  showChallengeToBeRuled: function (index) {
    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;
        return honestmediaInstance.getArticleId(index);
      }).then(function(result) {
        return honestmediaInstance.getArticle(result);
      }).then(function(result2) {
        article = result2;
        console.log(article);
        var ul = document.getElementById('challengesToRuleList');
        if(App.refreshChallenges == true) {
          ul.innerHTML = "";
          App.refreshChallenges = false;
        }
        var li = document.createElement('li');
        var titleText = document.createElement('h3');
        titleText.innerHTML = article[0];
        li.appendChild(titleText);

        var agreeButton = document.createElement('button');
        agreeButton.innerHTML = "Agree";
        agreeButton.onclick = function() {App.voteOnChallenge(index, true);}
        li.appendChild(agreeButton);

        var disagreeButton = document.createElement('button');
        disagreeButton.innerHTML = "Disagree";
        disagreeButton.onclick = function() {App.voteOnChallenge(index, false);}
        li.appendChild(disagreeButton);

        ul.appendChild(li);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  voteOnChallenge: function(index, vote){
    console.log("Saving vote");
    
    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[1];
      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;
        return honestmediaInstance.instance.getRulingId(index);
      }).then(function(result) {
        var rulingId = result;
        return honestmediaInstance.voteOnChallenge(rulingId, vote, index, {from: account});
      }).then(function(result1) {
        App.refreshChallenges = true;
        App.showChallengesToBeRuled();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  upvoteArticle: function(index){
    console.log('Adding upvote ...' + index);

    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;
        
        var articleContributor = instance.getArticleContributor(index);
        return honestmediaInstance.updateContributorRating(true, false, articleContributor, index);
      }).then(function(result) {
        App.showArticles();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  downvoteArticle: function(index){
    console.log("Downvoting.. " + index);

    var honestmediaInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;

        var articleContributor = instance.getArticleContributor(index);
        return honestmediaInstance.updateContributorRating(false, false, articleContributor, index, {from: account});
      }).then(function(result) {
        App.showArticles();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  challengeArticle: function(index, stake){
    console.log('Challenge article ..' + index);

    var honestmediaInstance;
    var account = $("#txt-readerAddress").val();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Honestmedia.deployed().then(function(instance) {
        honestmediaInstance = instance;
        
        return honestmediaInstance.challengeArticle(App.proofHash, stake, index);
      }).then(function(result) {
        console.log("Challenge registered.");
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  //Take file input from user
  captureFile: function (event) {
    event.stopPropagation()
    event.preventDefault()
      
    App.fileName = event.target.files[0];    

    console.log(App.fileName);
  }, 

  //Uploads file to IPFS.
  //TODO: need to figure out how to store metadata with Pinata
   uploadFile: async function(event){
    event.preventDefault();
    
    
    try{
            
      const ipfs = new Ipfs({ repo: String(Math.random() + Date.now()) } );
      //const ipfs = new Ipfs({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); 
            
      ipfs.on('ready', () => {
        console.log('Online status: ', ipfs.isOnline() ? 'online' : 'offline')
        const files = [
        {
          path: App.fileName.name,
          //content: Ipfs.Buffer.from(btoa(reader.result),"base64")
          content: App.fileName
        }
        ] 
        
        ipfs.add(files, function (err, files) {
          console.log("Storing file on IPFS using Javascript. HASH: https://ipfs.io/ipfs/"+files[0].hash);
          if(App.processId == 1){
            App.articleHash = files[0].hash;
            ipfs.cat(files[0].hash, function(err,fileContent){ console.log("cat (display) returned: "+err+" " + fileContent); })
          }else {
            if(App.processId == 2){
              App.referenceHash = files[0].hash;
            }else {
              if(App.processId == 3) {
                App.proofHash = files[0].hash;
              }
            }
          }
        });
      });
    } catch(err){
      console.log('ipfs issue : ' + err);
    }
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

     
