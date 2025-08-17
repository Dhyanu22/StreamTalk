document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  } else {
    console.error(
      "Could not find one or more elements: #signUp, #signIn, #container"
    );
  }

  // Add form submission handler
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Sign up failed");
      }

      const data = await response.json();
      alert("Sign up successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  });

  // Add sign in form handler
  const signinForm = document.getElementById("signinForm");

  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include" // Important for cookies to work
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // Cookie is automatically handled by the browser
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred during sign in");
    }
  });
});
