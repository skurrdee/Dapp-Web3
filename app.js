let provider;
let signer;
let userAddress;

document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    document.getElementById("account").innerText = "Connected: " + userAddress;
  } else {
    alert("Please install MetaMask!");
  }
};

document.getElementById("send").onclick = async () => {
  const to = document.getElementById("toAddress").value;
  const amount = document.getElementById("amount").value;

  try {
    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.utils.parseEther(amount)
    });
    alert("Transaction sent: " + tx.hash);
  } catch (err) {
    alert("Error: " + err.message);
  }
};
