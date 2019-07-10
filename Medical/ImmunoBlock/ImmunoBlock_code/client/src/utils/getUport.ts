import { Connect } from 'uport-connect';

const getUport = () => {
    const uport = new Connect('ImmunoBlock', {
        bannerImage: { '/': '/ipfs/QmYD2roj7j455Usn1BjxEsBzHGPj9P3M7tXTkavZMqehYD' },
        description: 'ImmunoBlock is a project for gitcoin beyound blockchain hackathon.',
        network: 'ropsten',
        profileImage: { '/': '/ipfs/QmU7ChytERzyUpwrrGEKAs2xvQGQSsNsjM7v4th5LUtdNt' },
        // network: { id: 5777, rpcUrl: 'http://localhost:8545' },
    });
    return uport;
};

export default getUport;
