const softwareProducts = [
    {
        id: '1',
        title: 'Антивирус Pro',
        description: 'Надежная защита от вирусов и вредоносных программ',
        category: 'Безопасность',
        image: './images/Antivirus2.svg'
    },
    {
        id: '2',
        title: 'Фото Редактор',
        description: 'Профессиональный редактор изображений с множеством функций',
        category: 'Графика и дизайн',
        image: './images/Photoshop.png'
    },
    {
        id: '3',
        title: 'Видео Конвертер',
        description: 'Быстрое конвертирование видео в различные форматы',
        category: 'Мультимедиа',
        image: './images/videokonverter.png'
    },
    {
        id: '4',
        title: 'Офисный Пакет',
        description: 'Полный набор офисных приложений для работы с документами',
        category: 'Офис',
        image: './images/Paket.jpg'
    },
    {
        id: '5',
        title: 'Браузер Турбо',
        description: 'Быстрый и безопасный веб-браузер, обеспечивающий приватность и защиту от угроз',
        category: 'Интернет',
        image: './images/Brauzer-removebg-preview.png'
    },
    {
        id: '6',
        title: 'Архиватор Плюс',
        description: 'Мощный инструмент для работы с архивами, обеспечивающий высокую степень сжатия',
        category: 'Утилиты',
        image: './images/Arxivator.png'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initRealTimeSearch();
});

function initRealTimeSearch() {
    const searchInputs = document.querySelectorAll('.search-input, .main-search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchQuery = e.target.value.trim();
            performRealTimeSearch(searchQuery, input);
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchQuery = input.value.trim();
                if (searchQuery) {
                    console.log(`Выполняется поиск: ${searchQuery}`);
                }
            }
        });
        
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        resultsContainer.style.display = 'none';
        input.parentNode.appendChild(resultsContainer);
    });
    
    document.addEventListener('click', (e) => {
        const searchContainers = document.querySelectorAll('.search-results-container');
        const searchInputs = document.querySelectorAll('.search-input, .main-search-input');
        
        let clickedOnSearch = false;
        searchInputs.forEach(input => {
            if (input.contains(e.target) || input === e.target) {
                clickedOnSearch = true;
            }
        });
        
        if (!clickedOnSearch) {
            searchContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    });
    
    addSearchStyles();
}


function performRealTimeSearch(query, inputElement) {
    const resultsContainer = inputElement.parentNode.querySelector('.search-results-container');
    
    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    const results = softwareProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
        let html = '<ul class="search-results-list">';
        
        results.forEach(product => {
            html += `
                <li class="search-result-item">
                    <a href="software-details.html?id=${product.id}">
                        <div class="search-result-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="search-result-info">
                            <div class="search-result-title">${product.title}</div>
                            <div class="search-result-category">${product.category}</div>
                        </div>
                    </a>
                </li>
            `;
        });
        
        html += '</ul>';
        resultsContainer.innerHTML = html;
    } else {
        resultsContainer.innerHTML = '<div class="search-no-results">Приложение не найдено</div>';
    }
    
    resultsContainer.style.display = 'block';
}
 
function addSearchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Стили для контейнера поиска */
        .search-container {
            position: relative;
        }
        
        /* Стили для результатов поиска */
        .search-results-container {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #fff;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-height: 400px;
            overflow-y: auto;
        }

        /* Стили для списка результатов */
        .search-results-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        /* Стили для элемента результата */
        .search-result-item {
            border-bottom: 1px solid #e5e7eb;
        }
        
        .search-result-item:last-child {
            border-bottom: none;
        }
        
        .search-result-item a {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            text-decoration: none;
            color: #111827;
        }
        
        .search-result-item a:hover {
            background-color: #f3f4f6;
        }
        
        /* Стили для изображения результата */
        .search-result-image {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .search-result-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }
        
        /* Стили для информации о результате */
        .search-result-info {
            flex: 1;
        }
        
        .search-result-title {
            font-weight: 500;
            margin-bottom: 3px;
        }
        
        .search-result-category {
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        /* Стили для сообщения "не найдено" */
        .search-no-results {
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(style);
}

var footerYear = document.getElementById('current-year')

footerYear.innerHTML = new Date().getFullYear();

function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button")

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")
  
        tabButtons.forEach((btn) => {
          btn.classList.remove("active")
        })
  
        button.classList.add("active")
  
        const tabContents = document.querySelectorAll(".tab-content")
        tabContents.forEach((content) => {
          content.classList.remove("active")
        })
  
        const selectedTab = document.getElementById(`${tabId}-tab`)
        if (selectedTab) {
          selectedTab.classList.add("active")
        }
      })
    })
  }
  
  function createRequirementsTab() {
    const requirementsTab = document.createElement("div")
    requirementsTab.className = "tab-content"
    requirementsTab.id = "requirements-tab"
  
    requirementsTab.innerHTML = `
      <div class="details-card">
        <h3>Системные требования</h3>
        <dl>
          <div class="detail-item">
            <dt>Операционная система:</dt>
            <dd>Windows 7/8/10/11, macOS 10.14 или новее</dd>
          </div>
          <div class="detail-item">
            <dt>Процессор:</dt>
            <dd>Intel Pentium 4 / AMD Athlon 64 или новее</dd>
          </div>
          <div class="detail-item">
            <dt>Оперативная память:</dt>
            <dd>2 GB RAM (4 GB рекомендуется)</dd>
          </div>
          <div class="detail-item">
            <dt>Свободное место на диске:</dt>
            <dd>500 MB</dd>
          </div>
          <div class="detail-item">
            <dt>Интернет-соединение:</dt>
            <dd>Требуется для обновлений и активации</dd>
          </div>
        </dl>
      </div>
    `
  
    return requirementsTab
  }
  
  function createReviewsTab() {
    const reviewsTab = document.createElement("div")
    reviewsTab.className = "tab-content"
    reviewsTab.id = "reviews-tab"
  
    reviewsTab.innerHTML = `
      <div class="details-card">
        <h3>Отзывы пользователей</h3>
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1rem;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
              <span style="font-weight: bold;">IS</span>
            </div>
            <div>
              <div style="font-weight: bold;">Ishowspeed</div>
              <div class="stars">★★★★★</div>
            </div>
          </div>
          <p>Отличный антивирус! Использую уже более года, ни разу не подвел. Интерфейс понятный, не нагружает систему.</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1rem;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
              <span style="font-weight: bold;">ФА</span>
            </div>
            <div>
              <div style="font-weight: bold;">Фаиг Агаев</div>
              <div class="stars">★★★★☆</div>
            </div>
          </div>
          <p>Хороший антивирус, но иногда бывают ложные срабатывания. В целом доволен покупкой.</p>
        </div>
        
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 1rem;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
              <span style="font-weight: bold;">ФК</span>
            </div>
            <div>
              <div style="font-weight: bold;">Филипп Киркоров</div>
              <div class="stars">★★★★★</div>
            </div>
          </div>
          <p>Лучший антивирус из всех, что я пробовал. Легкий, быстрый и эффективный. Рекомендую!</p>
        </div>
      </div>
    `
  
    return reviewsTab
  }
  
  function createScreenshotsTab() {
    const screenshotsTab = document.createElement("div")
    screenshotsTab.className = "tab-content"
    screenshotsTab.id = "screenshots-tab"
  
    screenshotsTab.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
        <div>
          <img src="./images/Screen-home-page.png" alt="Скриншот 1" style="width: 100%; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <p style="margin-top: 0.5rem; text-align: center;">Главный экран</p>
        </div>
        <div>
          <img src="./images/Screen-nastroyki.png" alt="Скриншот 2" style="width: 100%; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <p style="margin-top: 0.5rem; text-align: center;">Настройки безопасности</p>
        </div>
        <div>
          <img src="./images/Screen-profile.png" alt="Скриншот 3" style="width: 100%; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <p style="margin-top: 0.5rem; text-align: center;">Профиль</p>
        </div>
      </div>
    `
    return screenshotsTab
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelector(".tabs")
  
    if (tabsContainer) {
      const detailsTab = document.getElementById("details-tab")
      const screenshotsTab = document.getElementById("screenshots-tab")
      const requirementsTab = document.getElementById("requirements-tab")
      const reviewsTab = document.getElementById("reviews-tab")
  
      if (!screenshotsTab) {
        tabsContainer.appendChild(createScreenshotsTab())
      }
  
      if (!requirementsTab) {
        tabsContainer.appendChild(createRequirementsTab())
      }
  
      if (!reviewsTab) {
        tabsContainer.appendChild(createReviewsTab())
      }
      initTabs()
    }
  })