// APIs:
// https://api.aleth.io/v1/transactions?page[limit]=100&filter[account]=0x5a0f2c1d8e563db79ee40f979f6bcd0d27f86f80
// http://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&sort=asc
// https://api.trustwalletapp.com/transactions?address=0x9f8284ce2cf0c8ce10685f537b1fff418104a317&limit=5&startBlock=4386700&endBlock=4747999

var address = ""; //0x35a0b57be20179473d8cec8196d73a1e5ada1f8f"; //"0x5a0f2c1d8e563db79ee40f979f6bcd0d27f86f80";
var badTransactions = [];

// Utility function to check if obj value is set
function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

// Fetch all scam addresses from EtherscamDB.info:
$.getJSON("https://etherscamdb.info/api/addresses/", function(response) {
  console.log("Got scam addresses", response.result);
  var badAddresses = response.result;

  // Get supplied Ethereum address from URL:
  if(window.location.hash && window.location.hash.length > 0) {
    var hash = window.location.hash.substr(1);
    address = hash;
  }
  else if(window.location.pathname.replace('/address/').length > 0) {
    address = window.location.pathname.replace('/address/', '');
  }
  if(address && address.length > 0)
  {
    $('#address').html(address);

    // Fetch all the supplied address' transactions (Maximum 100 for now):
    $.getJSON("https://api.aleth.io/v1/transactions?page[limit]=100&filter[account]=" + address, function( data ) {
      var hasNext = data.meta.page.hasNext;
      var nextLink = data.links.next;
      var transactions = data.data;
      console.log("Got user's transactions", transactions);

      // Figure out who was the other address involved in each transaction:
      transactions.every((txn) => {
        var to = txn.relationships.to.data.id;
        var from = txn.relationships.from.data.id;
        var otherWallet;
        if(to == address) otherWallet = from;
        else if(from == address) otherWallet = to;

        // Add to UI
        $('#transactions').append('<div>'+JSON.stringify(txn)+'</div>');

        // Check if the other person is in our list of scam addresses:
        if(otherWallet) {
          if(!isEmpty(badAddresses[otherWallet])) {
            txn.scam = badAddresses[otherWallet];
            badTransactions.push(txn);
          }
        }

      });
      console.log("Done calculating bad transactions: ", badTransactions);

      // Update UI
      $('#sus-txns').html(badTransactions.length);
      $('#total-txns').html(transactions.length);
      if(badTransactions.length >= 1)
        $('#percentage').html('100%');
      else
        $('#percentage').html('0%');

      // Fetch specified address' ETH balance:
      $.getJSON("https://api.aleth.io/v1/accounts/" + address, function(response) {
        var balance = response.data.attributes.balance / 10e17;
        console.log("Got user's ETH balance", balance);
        $('#balance').html(balance.toFixed(5) + " ETH");
      });

    });
  } else {
    // No Address specified. Show error
    alert("Error: You must enter an Ethereum wallet address!");
    //window.location.replace("/");
  }
});
