document.addEventListener('DOMContentLoaded', () => {
    // 모든 페이지 공통으로 사용되는 기능 호출
    new DropdownMenu('.header');
    topBtnScrollEvent();
    dropDownToggle();
    snsToggle();
    accordionSkipText();
    leftMenu();
    mbMenuSlide();
    tooltip();
});

// 헤더 드롭 다운 메뉴
const MENU_CLASS = 'on';
const HEAD_NAV_BOX = '.head-menu__box';

class DropdownMenu {
    constructor(selector) {
        this.target = document.querySelector(selector);
        this.menuItems = this.target && this.target.querySelectorAll('.gnb-item');
        this.handleEvent();
    }

    handleEvent() {
        const navBox = document.querySelector('.gnb-list');
        const bar = document.querySelector('.head-line-bar');
        this.menuItems &&
            this.menuItems.forEach((menuItem) => {
                menuItem.addEventListener('mouseover', () => this.toggleNav(navBox, true));
                menuItem.addEventListener('focusin', () => this.toggleNav(navBox, true));
                menuItem.addEventListener('mouseout', () => this.toggleNav(navBox, false));
                menuItem.addEventListener('focusout', () => this.toggleNav(navBox, false));
                menuItem.addEventListener('mouseover', () => this.toggleNav(menuItem, true));
                menuItem.addEventListener('focusin', () => this.toggleNav(menuItem, true));
                menuItem.addEventListener('mouseout', () => this.toggleNav(menuItem, false));
                menuItem.addEventListener('focusout', () => this.toggleNav(menuItem, false));
                menuItem.addEventListener('mouseover', () => this.toggleNav(bar, true));
                menuItem.addEventListener('mouseout', () => this.toggleNav(bar, false));
            });
    }

    toggleNav(item, isOn) {
        item.classList.toggle(MENU_CLASS, isOn);

        if (item || window.innerWidth() > 1200) {
            $('.head-line-bar').css('width', $('.gnb-item.on').outerWidth());
            if ($('.gnb-item').hasClass(MENU_CLASS)) {
                var position = $('.gnb-item.on').position();
                $('.head-line-bar').css('left', position.left);
            }
            $('.gnb-item').hover(function (e) {
                var current = $(this),
                    position = current.position();
                $('.head-line-bar').css('left', position.left);
                $('.head-line-bar').css('width', $(this).outerWidth());
            });
        }
    }
}

// (모바일) 햄버거 메뉴 클릭시 메뉴 오픈
const mbMenuBtn = document.querySelector('.mb-menu-btn');
const mbSideMenu = document.querySelector('.mb-side-nav');
const mbMenuCloseBtn = document.querySelector('.menu-close-btn');

mbMenuBtn?.addEventListener('click', function () {
    mbMenuBtn.classList.toggle('on');
    mbSideMenu.classList.toggle('show');
});

// 모바일 사이드 메뉴 슬라이드 기능
function mbMenuSlide() {
    const $depth1 = $('.mb-menu-wrap .gnb-title');
    const $depth2 = $('.mb-menu-wrap .depth2-item > a');
    const duration = 300;
    $depth1.click(function (e) {
        e.preventDefault();
        $('.mb-menu-wrap .head-menu__box').stop().slideUp(duration);
        $('.mb-menu-wrap .gnb-title').removeClass('show');
        $('.mb-menu-wrap .depth2-item').removeClass('show');
        $('.mb-menu-wrap .depth3-list').stop().slideUp(duration);

        if (!$(this).next().is(':visible')) {
            $(this).next().stop().slideDown(duration);
            $(this).addClass('show');
        }
    });

    $depth2.click(function (e) {
        e.preventDefault();
        $('.mb-menu-wrap .depth3-list').stop().slideUp(duration);
        $('.mb-menu-wrap .depth2-item').removeClass('show');

        if (!$(this).next().is(':visible')) {
            $(this).next().stop().slideDown(duration);
            $(this).parent().addClass('show');
        }
    });
}

const topBtn = document.querySelector('.btn-top');
const footer = document.querySelector('footer')

// 푸터쪽 진입 시 position 조정
window.addEventListener('scroll', function(){
    let winTop = this.scrollY;
    let winHeight = this.innerHeight;
    
    if(winTop + winHeight >= footer?.offsetTop) {
        topBtn?.classList.add('off')
    } else {
        topBtn?.classList.remove('off')
    }
})

// 버튼 클릭시 상단으로 이동
topBtn?.addEventListener('click', function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
})

// 드롭다운 토글
function dropDownToggle() {
    const dropDownToggleWraps = document.querySelectorAll('.dropdown-toggle-group');

    function toggleBox(selectBox) {
        selectBox.classList.toggle('on');
    }

    dropDownToggleWraps.forEach((dropDownToggleWrap) => {
        dropDownToggleWrap.addEventListener('click', function () {
            toggleBox(dropDownToggleWrap);

            dropDownToggleWraps.forEach((box) => {
                if (box !== dropDownToggleWrap) {
                    box.classList.remove('on');
                }
            });
        });
    });

    document.addEventListener('click', function (e) {
        const targetElement = e.target;
        const isSelect = targetElement.classList.contains('on') || targetElement.closest('.dropdown-toggle-group');

        if (isSelect) {
            return;
        }

        const allDropDownToggleWraps = document.querySelectorAll('.dropdown-toggle-group');

        allDropDownToggleWraps.forEach((boxElement) => {
            boxElement.classList.remove('on');
        });
    });
}

// sns 토글
function snsToggle() {
    const snsToggleWraps = document.querySelectorAll('.sns-toggle-group');

    function toggleBox(selectBox) {
        selectBox.classList.toggle('on');
    }

    snsToggleWraps?.forEach((snsToggleWrap) => {
        snsToggleWrap.addEventListener('click', function () {
            toggleBox(snsToggleWrap);

            if(snsToggleWrap.classList.contains('on')) {
                snsToggleWrap.querySelector('.sns-toggle-btn').setAttribute('title', 'sns공유 닫기')
            } else {
                snsToggleWrap.querySelector('.sns-toggle-btn').setAttribute('title', 'sns공유 열기')
            }

            snsToggleWraps.forEach((box) => {
                if (box !== snsToggleWrap) {
                    box.classList.remove('on');
                }
            });
        });
    });

    document.addEventListener('click', function (e) {
        const targetElement = e.target;
        const isSelect = targetElement.classList.contains('on') || targetElement.closest('.sns-toggle-group');

        if (isSelect) {
            return;
        }

        const allSnsToggleWraps = document.querySelectorAll('.sns-toggle-group');

        allSnsToggleWraps.forEach((boxElement) => {
            boxElement.classList.remove('on');
        });
    });
}

// 탭메뉴
class Tab {
    constructor(selector, option) {
        this.defaultOtp = {
            btns: 'ul',
            boxs: '.tab-contents-wrap .tab-content',
            activeClass: 'on',
        };
        const resultOtp = { ...this.defaultOtp, ...option };
        this.frame = document.querySelector(selector);
        this.btns = this.frame.querySelector(resultOtp.btns);
        this.boxs = this.frame.querySelectorAll(resultOtp.boxs);
        this.activeClass = resultOtp.activeClass;
        let spanEl = document.createElement('span');
        let spanText = document.createTextNode('선택됨');
        spanEl.classList.add('visually-hidden');
        spanEl.appendChild(spanText);
        this.addSelectedText(this.btns.querySelectorAll('li')[0].querySelector('a'));
        this.bindingEvent();
    }

    addSelectedText(target) {
        let spanEl = document.createElement('span');
        let spanText = document.createTextNode('선택됨');
        spanEl.classList.add('visually-hidden');
        spanEl.appendChild(spanText);
        target.append(spanEl);
    }

    bindingEvent() {
        this.btns.addEventListener('click', (e) => {
            const target = e.target.closest('li');
            let isOn = target.classList.contains(this.activeClass);
            if (isOn) return;
            const nodes = [...target.parentElement.children];
            const index = nodes.indexOf(target);
            this.activation(nodes, index);

            const textTarget = target.querySelector('a');
            this.removeSelectedText();
            this.addSelectedText(textTarget);
        });

        //탭 개수 파악 후 5개 이상일 경우 vertical-mode 클래스 추가
        // const tabItemLength = document.querySelectorAll('.tabBoxLine > ul > li').length;
        // tabItemLength >= 5 && this.btns.classList.add('vertical-mode');
    }

    removeSelectedText() {
        this.btns.querySelectorAll('.visually-hidden').forEach((node) => {
            node.remove();
        });
    }

    activation(items, index) {
        items.forEach((el) => el.classList.remove(this.activeClass));
        items[index].classList.add(this.activeClass);
        this.boxs.forEach((el) => el.classList.remove(this.activeClass));
        this.boxs[index]?.classList.add(this.activeClass);
    }
}

// 탭 이동
function moveTab(index) {
    const tabEls = document.querySelector('.step-box');
    const tabBtnEls = tabEls.querySelectorAll('.tab-btn');
    const tabContentEls = [...document.querySelector('.step-box + .tab-contents-wrap').children];
    const tabBtnTarget = tabBtnEls[index-1];
    const tabContentTarget = tabContentEls.find(tabContentEl => tabContentEl.dataset.connecttab == index);
    removeActive(tabBtnEls);
    removeActive(tabContentEls);
    tabContentTarget.classList.add('on');
    tabBtnTarget.classList.add('on');

    tabEls.querySelectorAll('.visually-hidden').forEach((node) => {
        node.remove();
    });
    accessibilityText(tabBtnTarget.querySelector('a'));
}

// 화면 확대, 축소
let nowZoom = 100;
let zoomControl = {
    zoomOut: function () {
        nowZoom = nowZoom - 5;
        if (nowZoom < 90) {
            alert('더 이상 축소할 수 없습니다.');
            nowZoom = 90;
        }
        if (nowZoom <= 90) nowZoom = 90;
        zoomControl.zooms();
        document.querySelector('.zoom-text > button').innerText = nowZoom + '%';
    },
    zoomIn: function () {
        nowZoom = nowZoom + 5;
        if (nowZoom > 120) {
            alert('더 이상 확대할 수 없습니다.');
            nowZoom = 120;
        }
        if (nowZoom >= 120) nowZoom = 120;
        zoomControl.zooms();
        document.querySelector('.zoom-text > button').innerText = nowZoom + '%';
    },
    zoomReset: function () {
        nowZoom = 100;
        zoomControl.zooms();
        document.querySelector('.zoom-text > button').innerText = nowZoom + '%';
    },
    zooms: function () {
        let aUserAgent = navigator.userAgent.toLowerCase();

        if (aUserAgent.indexOf('firefox') >= 0) {
            var body = document.querySelector('body');
            body.style.transform = 'scale(' + nowZoom + '%)';
            body.style.transformOrigin = '0 0';
        } else {
            document.body.style.zoom = nowZoom + '%';
        }
    },
};

// top 버튼클릭시 상단이동
function topBtnScrollEvent() {
    const topBtn = document.querySelector('.top-btn');
    topBtn?.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 모달창 열기
function openModal(name) {
    const modalTarget = document.querySelector(`#${name}`);
    const modalCloseBtn = modalTarget.querySelector('.modal-close-btn');
    modalTarget.classList.add('on');
    modalTarget.classList.remove('effect--out');
    modalCloseBtn.focus();

    document.body.classList.add('scroll-off');
}

// 모달창 닫기
function closeModal(name) {
    const modalTarget = document.querySelector(`#${name}`);
    modalTarget.classList.add('effect--out');
    setTimeout(() => {
        modalTarget.classList.remove('on');
    }, 120);
    document.querySelector('.returnFocus')?.focus(); // 팝업 열기 버튼으로 포커스 복귀
    document.body.classList.remove('scroll-off');
}

// left메뉴 하위메뉴 있는 것 접근성 텍스트 추가
function accordionSkipText() {
    const menuTitles = document.querySelectorAll('.left-menu__list .depth-title');
    menuTitles?.forEach((menuTitle) => {
        if (menuTitle.nextElementSibling) {
            const list = menuTitle.nextElementSibling;
            const skipText = document.createElement('span');
            const a = menuTitle.querySelector('a');
            const open = a.getAttribute('aria-expanded');
            skipText.classList.add('visually-hidden');
            skipText.textContent = '펼치기';
            a.append(skipText);

            if (open == 'true') {
                list.classList.add('is-open');
                list.style.maxHeight = list.scrollHeight + 'px';
                list.style.padding = '2rem 2rem 2rem 2rem';
                skipText.textContent = '닫기';
            }
        }
    });
}

// left메뉴 아코디언
function leftMenu() {
    const headings = document.querySelectorAll('.left-menu .depth-title');
    const triggers = [];
    const accordionContents = document.querySelectorAll('.depth-list');
    const multiselect = document.getElementById('multiselect');
    const copyOpenClass = 'is-open';
    const menuOnClass = 'is-on';

    headings?.forEach((h, i) => {
        let btn = h.querySelector('a');
        triggers.push(btn);
        btn.onclick = (e) => {
            let target = h.nextElementSibling;
            const menuItem = h.parentElement;
            const skipText = btn.querySelector('.visually-hidden');

            if (target) {
                console.log(target.scrollHeight);
                let expanded = btn.getAttribute('aria-expanded') === 'true';
                e.preventDefault();
                closeAllExpandedItems();
                if (expanded) {
                    closeItem(target, btn, menuItem, skipText);
                } else {
                    openItem(target, btn, menuItem, skipText);
                }
            }
        };
    });

    function closeAllExpandedItems() {
        const expandedTriggers = triggers.filter((t) => t.getAttribute('aria-expanded') === 'true');
        const expandedCopy = Array.from(accordionContents).filter((c) => c.classList.value.includes(copyOpenClass));
        const menuItem = document.querySelectorAll('.left-menu__item');
        expandedTriggers.forEach((trigger) => {
            trigger.setAttribute('aria-expanded', false);
        });
        expandedCopy.forEach((copy) => {
            copy.classList.remove(copyOpenClass);
            copy.style.maxHeight = 0;
            copy.style.padding = '0 2rem 0 2rem';
        });
        menuItem.forEach((item) => {
            item.classList.remove(menuOnClass);
        });
    }

    function closeItem(target, btn, menu, skip) {
        btn.setAttribute('aria-expanded', false);
        target.classList.remove(copyOpenClass);
        target.style.maxHeight = 0;
        target.style.padding = '0 2rem 0 2rem';
        menu.classList.remove(menuOnClass);
        skip.textContent = '펼치기';
    }

    function openItem(target, btn, menu, skip) {
        btn.setAttribute('aria-expanded', true);
        target.classList.add(copyOpenClass);
        target.style.maxHeight = target.scrollHeight + 'px';
        target.style.padding = '2rem 2rem 2rem 2rem';
        menu.classList.add(menuOnClass);
        skip.textContent = '닫기';
    }
}

// 모달 버튼 포커스 복귀
const $popBtnEls = document.querySelectorAll('.modal-open-btn');
$popBtnEls.forEach(($popBtnEl) => {
    $popBtnEl.addEventListener('click', function () {
        document.querySelectorAll('.returnFocus').forEach((focusEl) => {
            focusEl.classList.remove('returnFocus');
        });
        this.classList.add('returnFocus');
    });
});

// 모든 활성화 클래스 삭제
function removeActive(itemEls) {
    itemEls.forEach((itemEl) => {
        if (itemEl.classList.contains('on')) {
            itemEl.classList.remove('on');
            itemEl.classList.remove('active');
        }
    });
}

// 리스트 정렬
function sortList() {
    const $sortListEl = document.querySelector('.sort-list');
    const $codnitiontitleEls = document.querySelectorAll('.sort-item');
    $codnitiontitleEls.forEach(($codnitiontitleEl) => {
        $codnitiontitleEl.addEventListener('click', function () {
            removeActive($codnitiontitleEls);
            const $target = this;
            $target.classList.add('on');
            if ($target.classList.contains('up')) {
                $target.classList.remove('up');
                $target.classList.add('down');
            } else {
                $target.classList.remove('down');
                $target.classList.add('up');
            }

            const $targetSkipEls = $sortListEl.querySelectorAll('.visually-hidden');
            $targetSkipEls.forEach(($targetSkipEl) => $targetSkipEl.remove());
            accessibilityText($codnitiontitleEl);
        });
    });
}

// textarea 글자수에 따른 높이 조절
function resize(obj) {
    // obj.classList.add('hide-scrollbar');
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
    // console.log(obj.scrollHeight);
    // console.log(obj);
}

// 접근성 텍스트
function accessibilityText(targetEl) {
    let spanEl = document.createElement('span');
    let spanText = document.createTextNode('선택됨');
    spanEl.classList.add('visually-hidden');
    spanEl.appendChild(spanText);
    targetEl.append(spanEl);
}

// 아코디언 메뉴
function accordionSlide(target) {
    const $accordionEl = document.querySelector(target);
    const $accordionBtn = $accordionEl.querySelectorAll('button');
    const $itemEls = Array.from($accordionEl.querySelectorAll('.accordion-group'));
    const $targetSkipEls = Array.from($accordionEl.querySelectorAll('.visually-hidden'));

    $accordionBtn.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const $targetItemEl = event.target.closest('.accordion-group');
            if (!$targetItemEl) return;

            const $targetSkipEl = $targetItemEl.querySelector('.visually-hidden');
            $targetSkipEls.forEach((skipEl) => (skipEl.innerText = '열기'));

            toggleAccordion($targetItemEl, $itemEls, $targetSkipEl);
        });
    });
}

// 아코디언 토글
function toggleAccordion(targetEl, itemEls, targetSkipEl) {
    const isActive = targetEl?.classList.contains('on');

    if (isActive) {
        targetEl.classList.remove('on');
        if (targetSkipEl) targetSkipEl.innerText = '열기';
    } else {
        removeActive(itemEls);
        targetEl.classList.add('on');
        if (targetSkipEl) targetSkipEl.innerText = '닫기';
    }
}

// 드롭다운 셀렉트
var $selectCotaniner = $('.drop-select-wrap');

$selectCotaniner?.each(function (index, selectWrap) {
    // 필터 버튼 클릭시 필터 나오게
    // selectWrap은 필터 전체 / this는 필터버튼
    $(selectWrap).off().on('click', 'button', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(this).hasClass('active')) {
                $(selectWrap).find('.select-menu-box').slideUp(100);
                $(this).removeClass('active');
                outClickClose();
            } else {
                // 모두 접히게 초기화
                $selectCotaniner.find('.select-menu-box').hide();
                $selectCotaniner.find('.select-btn').removeClass('active');

                $(this).addClass('active');
                $(selectWrap).find('.select-menu-box').slideDown(100);
                outClickClose();
            }
        });

    // 필터 리스트 클릭시 닫히고 값 입력되게
    $(selectWrap).find('.select-menu-box').on('click', '.select-item a', function (e) {
        e.preventDefault();

        outClickClose();
        var idx = $(this).parent().index();
        var selected = $(selectWrap).find('.real_select_list option').eq(idx).text();
        let hidden = $(selectWrap).find('.select-menu-box').find('.visually-hidden')

        // 선택된 li에 클래스추가
        $(this).parent().siblings().removeClass('selected');
        $(this).parent().addClass('selected');

        console.log(selected);
        if(hidden){
            hidden.remove();
        }
        accessText($(this).parent())

        // 선택 값과 텍스트 노출
        $(selectWrap).find('.real_select_list').val(idx+1);
        $(selectWrap).find('.select-text').text(selected);

        // 리스트 클릭시에도 리스트사라지고, 화살표 돌아가게 처리
        $(selectWrap).find('.select-menu-box').slideUp(300);
        setTimeout(() => {
            $(selectWrap).find('.select-btn').removeClass('active');
        }, 300);
    });

    // 이외 타켓 클릭 시
    function outClickClose() {
        $('body').click(function (e) {
            if ($(e.target).is('.select_wrap, .select_wrap *')) {
                return;
            } else {
                $(selectWrap).find('.select-menu-box').slideUp(300);

                setTimeout(() => {
                    $(selectWrap).find('.select-btn').removeClass('active');
                }, 300);
            }
        });
    }
});

// // 셀렉트 접근성 텍스트
function accessText(targetEl) {
    let spanEl = document.createElement('span');
    let spanText = document.createTextNode('선택됨');

    spanEl.classList.add('visually-hidden');
    spanEl.appendChild(spanText);
    targetEl.append(spanEl);
}

// 선택형 토글
function toggleSelect(selector) {
    const target = document.querySelector(selector);
    const targetArr = target && Array.from(target.children);

    target?.addEventListener('click', (e) => {
        const targetEl = e.target.closest('button');
        if (!targetEl || targetEl.classList.contains('on')) return;

        removeActive(targetArr);
        targetEl.classList.add('on');

        const targetSkipEls = target.querySelectorAll('.visually-hidden');
        targetSkipEls.forEach((targetSkipEl) => targetSkipEl.remove());

        const spanEl = document.createElement('span');
        spanEl.classList.add('visually-hidden');
        spanEl.textContent = '선택됨';

        targetEl.appendChild(spanEl);
    });
}

// 클립보드 복사
const copyBtn = document.querySelectorAll('.btn--copy');

// button 클릭 이벤트
copyBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        const copyT = btn.previousSibling;
        var r = document.createRange();
        r.selectNode(copyT);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('주소가 복사되었습니다.');
    });
});


// 툴팁 보기
// const tooltipBtnEls = document.querySelectorAll('.tooltip button');

// tooltipBtnEls?.forEach((tooltipBtnEl)=> {
//     tooltipBtnEl.addEventListener('click', function() {
//         const target = this.parentNode;
//         const tooltipEl = target.querySelector('.tooltip-cont');
//         tooltipEl.classList.toggle('on');
    
//         if(tooltipEl.classList.contains('on')) {
//             this.setAttribute('title', '툴팁 닫기')
//         }else {
//             this.setAttribute('title', '툴팁 열기')
//         }
//     })
// })

// sns 토글
function tooltip() {
    const tooltipBtnEls = document.querySelectorAll('.tooltip');

    function toggleBox(selectBox) {
        selectBox.classList.toggle('on');
    }

    tooltipBtnEls?.forEach((tooltipBtnEl) => {
        tooltipBtnEl.addEventListener('click', function () {
            toggleBox(tooltipBtnEl);

            if(tooltipBtnEl.classList.contains('on')) {
                tooltipBtnEl.querySelector('.question-mark').setAttribute('title', '툴팁 닫기')
            } else {
                tooltipBtnEl.querySelector('.question-mark').setAttribute('title', '툴팁 열기')
            }

            tooltipBtnEls.forEach((box) => {
                if (box !== tooltipBtnEl) {
                    box.classList.remove('on');
                }
            });
        });
    });

    document.addEventListener('click', function (e) {
        const targetElement = e.target;
        const isSelect = targetElement.classList.contains('on') || targetElement.closest('.tooltip');

        // console.log(targetElement.closest('.tooltip'));
        if (isSelect) {
            return;
        }

        const alltooltipBtnEls = document.querySelectorAll('.tooltip');

        alltooltipBtnEls.forEach((boxElement) => {
            boxElement.classList.remove('on');
        });
    });
}