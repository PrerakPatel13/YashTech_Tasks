document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.button-container button');
  const menuItems = document.querySelectorAll('.menu-item');

  buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          const targetCategory = btn.dataset.target;

          buttons.forEach(button => button.classList.remove('active'));
          btn.classList.add('active');

          menuItems.forEach(menuItem => {
              const itemCategories = menuItem.dataset.category.split(' ');

              if (itemCategories.includes(targetCategory) || targetCategory === 'all') {
                  menuItem.style.display = 'block';
              } else {
                  menuItem.style.display = 'none';
              }
          });
      });
  });

  menuItems.forEach(menuItem => {
      menuItem.style.display = 'block';
  });
});
