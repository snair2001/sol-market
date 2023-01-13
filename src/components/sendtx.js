const wallet = Keypair.generate()
let connection = new Connection(clusterApiUrl("devnet"), "confirmed")

const aidropsig = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL / 2)

await connection.confirmTransaction(aidropsig)

let mint = await createMint(
  connection,
  wallet,
  wallet.publicKey,
  null,
  0
);

console.log(mint.toString());

let tokenAcc = await getOrCreateAssociatedTokenAccount(connection,
  wallet,
  mint,
  wallet.publicKey
);

console.log(tokenAcc.address.toBase58());