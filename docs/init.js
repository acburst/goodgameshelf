// self executing function here
(function() {
  let links = document.querySelectorAll('.section-link');

  const toID = (string) => {
    return string.replace(/\s/g, '').toLowerCase();
  }

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
      let id = sections[i].id || 'null';
      let stickyTags = sections[i].querySelector('.tags');
      let contentOffset = 100;
      let link = document.querySelector('.section-link[data-target='+id+']');
      scrollTop += contentOffset;

      if (window.innerWidth <= 700) {
        indicator.style = null;

      } else {
        if (i === 0) {
          // progress.style.height = '100%';
          indicator.style.transform = '';
          for (let i = 0; i < links.length; i++) { links[i].classList.remove('active') }

        } else if (scrollTop < top) {
          stickyTags.classList.remove('sticky');
          stickyTags.style = null;

        } else if (i === sections.length - 1 &&
                   (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          // progress.style.height = '100%';
          if (!link.classList.contains('active')) {
            indicator.style.transform = `translateY(${i * 36}px)`;
            link.classList.add('active');
          }

        } else if (scrollTop > top && scrollTop < bottom) {
          let perc = Math.min(Math.max((scrollTop - top) / rect.height, 0), 1);
          // console.log("ACTIVE", i, perc);
          // progress.style.height = perc * 100 + '%';
          if (!link.classList.contains('active')) {
            indicator.style.transform = `translateY(${i * 36}px)`;
            link.classList.add('active');
          }
          if (stickyTags) {
            let tagsRect = stickyTags.getBoundingClientRect();
            if (scrollTop > bottom - tagsRect.height - contentOffset) {
              if (!stickyTags.classList.contains('sticky-bottom')) {
                // console.log("STICKY BOTTOM", scrollTop,  bottom, tagsRect.height);
                stickyTags.classList.remove('sticky');
                stickyTags.classList.add('sticky-bottom');
                stickyTags.style = null;
                stickyTags.style.top = 'auto';
                stickyTags.style.bottom = contentOffset + 'px';
              }
            } else if (!stickyTags.classList.contains('sticky')) {
              stickyTags.classList.remove('sticky-bottom');
              stickyTags.classList.add('sticky');
              // console.log("STICKY", `${tagsRect.left + tagsRect.width}px`);
              stickyTags.style = null;
              stickyTags.style.position = 'fixed';
              stickyTags.style.transform = 'translateX(0)';
              stickyTags.style.top = contentOffset + 'px';
              stickyTags.style.right = 'auto';
              stickyTags.style.left = `${tagsRect.left}px`;
            }

          }

        }
      }
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
      e.preventDefault();
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