const handleCheckout = async () => {
  try {
    const res = await fetch("/.auth/me");
    const { clientPrincipal } = await res.json();

    if (!clientPrincipal) {
      alert("You must be logged in to checkout.");
      return;
    }

    const { userId } = clientPrincipal;

    for (const book of cartItems) {
      await fetch("https://e-book-function-app-era6f7f3dceycpcu.centralindia-01.azurewebsites.net/api/add_to_mybooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, book }),
      });
    }

    alert("Books successfully added to My Books!");
    // Optional: redirect to MyBooks page or clear cart
  } catch (err) {
    console.error("Checkout failed", err);
    alert("An error occurred during checkout.");
  }
};
