const div = document.createElement("div");

div.classList.add("section", "about-me");
div.innerHTML = `
    <h1 class="header">About Me</h1>
    <p>Herlock Sholmes was a legendary but mysterious English consulting detective
                known for his rapid-fire abductive reasoning. He primarily lived with the young
                Iris Wilson, who adapted his exploits with fellow tenants "John H. Wilson" and
                later Ryunosuke Naruhodo into a series of stories collectively known as
                The Adventures of Herlock Sholmes published in The Randst Magazine.
    </p>
`;

document.querySelector("body").appendChild(div);