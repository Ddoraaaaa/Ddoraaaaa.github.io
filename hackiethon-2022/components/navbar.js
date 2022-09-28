document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    console.log($navbarBurgers)
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  
});

function scrollToEl(el) {
    console.log(-732568764);
    const element = document.getElementById(el);

    element.scrollIntoView({behavior: "smooth"});
}

// // Enable hidden nav bar
{
    const divv = document.getElementById("bigBadBox");
    console.log(divv);
    const nav = document.querySelector(".navbarr");
    let lastScroll = divv.scrollTop;
  
    let lastupd = Date.now();
    divv.addEventListener("scroll", () => {
      // if(lastupd+1000<Date.now()) return;
      // lastupd = Date.now();
      console.log(divv.scrollTop);
      if (lastScroll < divv.scrollTop) {
        window.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      }
  
      lastScroll = divv.scrollTop;
    });
}
  