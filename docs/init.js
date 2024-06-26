// self executing function here
(function() {
  let links = document.querySelectorAll('.section-link');
  let titles = document.querySelectorAll('.section-title');
  const footer = document.querySelector('footer');
  const navbar = document.querySelector('.navbar');

  const toID = (string) => {
    return string.replace(/\s/g, '').toLowerCase();
  }

  const handleScroll = (e) => {
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let sections = document.querySelectorAll('.section');
    let indicator = document.querySelector('.indicator');
    let progress = document.querySelector('.indicator .progress');
    let contentOffset = 100;
    for (var i = 0; i < sections.length; i++) {
      let rect = sections[i].getBoundingClientRect()
      let top = rect.top + scrollTop;
      let bottom = top + rect.height;
      let id = sections[i].id.replaceAll(/[0-9]/g, '') || 'null';
      let stickyTags = sections[i].querySelector('.tags');
      let link = document.querySelector('.section-link[data-target='+id+']');
      scrollTop += contentOffset;

      if (window.innerWidth <= 1170) {
        if (indicator) indicator.style = null;

      } else {
        if (i === 0) {
          // progress.style.height = '100%';
          if (indicator) indicator.style.transform = '';
          for (let i = 0; i < links.length; i++) { links[i].classList.remove('active') }

        } else if (stickyTags && scrollTop < top) {
          // check for stickTags because some pages have sections without tags (e.g homepage)
          stickyTags.classList.remove('sticky');
          stickyTags.style = null;

        } else if (i === sections.length - 1 &&
                   (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          // progress.style.height = '100%';
          if (link && !link.classList.contains('active')) {
            if (indicator) indicator.style.transform = `translateY(${i * 32}px)translateX(22px)`;
            link.classList.add('active');
          }

        } else if (scrollTop > top && scrollTop < bottom) {
          let perc = Math.min(Math.max((scrollTop - top) / rect.height, 0), 1);
          // console.log("ACTIVE", i, perc);
          // progress.style.height = perc * 100 + '%';
          if (link && !link.classList.contains('active')) {
            if (indicator) indicator.style.transform = `translateY(${i * 32}px)translateX(22px)`;
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

    // Navbar
    if (footer) {
      if (window.innerWidth > 700) {
        let el = document.getElementById('sidebar-1');
        // console.log(el.offsetHeight);
        let footerRect = footer.getBoundingClientRect();
        // console.log(document.body.offsetHeight , scrollTop , footerRect.height, window.innerHeight);
        let scrollOffset = sections.length ? contentOffset * (2 - sections.length) : 100; // because each page type has different initial scrollTop value for some reason (multiple of contentOffset i think)
        if (document.body.offsetHeight - footerRect.height < scrollTop + el.offsetHeight + scrollOffset) {
          let navbarRect = navbar.getBoundingClientRect();
          // console.log(navbarRect);
          if (!navbar.classList.contains('sticky-bottom')) {
            navbar.classList.add('sticky-bottom');
            navbar.style.top = (footer.offsetTop - navbarRect.height) + 'px';
          }
        } else {
          if (navbar.classList.contains('sticky-bottom')) {
            navbar.classList.remove('sticky-bottom');
            navbar.style = null;
          }
        }
      } else {
        if (navbar.classList.contains('sticky-bottom')) {
          navbar.classList.remove('sticky-bottom');
          navbar.style = null;
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
      // console.log(target);
      let section = document.querySelector('#' + target);
      window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': section.offsetTop + 1
      });
    })
  }


  // Hamburger menu
  let hamburgerEl = document.querySelector('.hamburger');
  if (hamburgerEl) {
    hamburgerEl.addEventListener('click', () => {
      // console.log("HAMB CLICK");
      let linksEl = document.querySelector('.links');
      linksEl.classList.toggle('active');
    });
  }

  // // Email Signup
  // let emailErrorMessage = document.querySelector('.email-octopus-error-message');
  // let emailSuccessMessage = document.querySelector('.email-octopus-success-message');
  // if (emailErrorMessage.innerHTML || emailSuccessMessage.innerHTML) {
  //   document.querySelector('.email-octopus-initial-message').style.visibility = 'hidden';
  // }

  // Sidebar Search
  let searchbarEl = document.querySelector('#searchbar');
  searchbarEl.addEventListener("input", (e) => {
    let text = e.target.value.toLowerCase();

    for (var i = 0; i < titles.length; i++) {
      // Skip active toc
      if (titles[i].classList.contains('active')) continue;

      let title = titles[i].innerText.toLowerCase();
      if (title.indexOf(text) === -1) {
        console.log("TITLE", titles[i], title);
        titles[i].classList.add('hidden');
      } else {
        titles[i].classList.remove('hidden');
      }
    }
  });

})();