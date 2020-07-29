// self executing function here
(function() {
  const handleScroll = (e) => {
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let sections = document.querySelectorAll('.section');
    let indicator = document.querySelector('.indicator');
    let progress = document.querySelector('.indicator .progress');
    for (var i = 0; i < sections.length; i++) {
      let rect = sections[i].getBoundingClientRect()
      let top = rect.top + scrollTop;
      let bottom = top + rect.height;
      let id = sections[i].id;

      if ((i === 0 && scrollTop < top) ||
          (i === sections.length - 1 && scrollTop > bottom) ||
          (scrollTop > top && scrollTop < bottom)) {
        let perc = Math.min(Math.max((scrollTop - top) / rect.height, 0), 1);
        console.log("ACTIVE", i, perc);
        progress.style.height = perc * 100 + '%';
        indicator.style.transform = `translateY(${i * 48}px)`;

      }
      console.log(top, bottom);
    }
    console.log(scrollTop);
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  let links = document.querySelectorAll('.section-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
      let target = e.target.getAttribute('data-target');
      console.log(target);
      let section = document.querySelector('#' + target);
      window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': section.offsetTop + 1
      });
    })
  }


})();