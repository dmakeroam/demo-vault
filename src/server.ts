import express from 'express';
import { Vault } from '@mittwald/vaults'

const app = express();
const port = 9000;

app.get('/',(req, res) => {
    res.send('Server is up and running!');
});

app.get('/vault-test', async (req, res) => {
    const vault = new Vault({
        vaultAddress: "https://main-vault-private-vault-c19d2835.e11c0ec5.z1.hashicorp.cloud:8200",
        vaultToken: "hvs.CAESIKu-l1VVkCB25R-3hFIHBP6HB1l9yLgUaJ20up1v4wHCGigKImh2cy5haDU4dDIxWjhwVWU0bVdVellOUFJGbEguU3lJVjgQgqcB",
        vaultNamespace: "admin"
    });

    const vaultClient = vault.KV(2,'kv')
    const oam = await vaultClient.read('oam')

    res.send('Key: test, Value: '+oam.data.data.test);
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});