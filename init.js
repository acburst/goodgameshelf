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
      let stickyTags = sections[i].querySelector('.tags');
      let contentOffset = 100;
      scrollTop += contentOffset;

      // console.log(i, scrollTop, top);

      if (i === 0) {
        progress.style.height = '100%';
        indicator.style.transform = '';

      } else if (scrollTop < top) {
        stickyTags.classList.remove('sticky');
        stickyTags.style = null;

      } else if (scrollTop > top && scrollTop < bottom) {
        let perc = Math.min(Math.max((scrollTop - top) / rect.height, 0), 1);
        // console.log("ACTIVE", i, perc);
        progress.style.height = perc * 100 + '%';
        indicator.style.transform = `translateY(${i * 48}px)`;
        if (stickyTags) {
          let tagsRect = stickyTags.getBoundingClientRect();
          if (scrollTop > bottom - tagsRect.height) {
            if (!stickyTags.classList.contains('sticky-bottom')) {
              console.log("STICKY BOTTOM", scrollTop,  bottom, tagsRect.height);
              stickyTags.classList.remove('sticky');
              stickyTags.classList.add('sticky-bottom');
              stickyTags.style = null;
              stickyTags.style.top = 'auto';
              stickyTags.style.bottom = 0;
            }
          } else if (!stickyTags.classList.contains('sticky')) {
            stickyTags.classList.remove('sticky-bottom');
            stickyTags.classList.add('sticky');
            console.log("STICKY", `${tagsRect.left + tagsRect.width}px`);
            stickyTags.style = null;
            stickyTags.style.position = 'fixed';
            stickyTags.style.transform = 'translateX(0)';
            stickyTags.style.top = contentOffset + 'px';
            stickyTags.style.right = 'auto';
            stickyTags.style.left = `${tagsRect.left}px`;
          }

        }


      } else if (i === sections.length - 1 && scrollTop > bottom) {
        progress.style.height = '100%';
        indicator.style.transform = `translateY(${i * 48}px)`;

      }
      // console.log(top, bottom);
    }
    // console.log(scrollTop);
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