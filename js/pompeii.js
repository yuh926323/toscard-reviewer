class CardReviewer {
    constructor() {
        this.elems = {};
        this.inventoryCardsInfo = [];
        this.inventoryCards = [];
        this.searched = [];
    }

    renderReviewerDOM() {
        // create reviewer-container & button
        const buttonDOM = document.createElement('div');
        buttonDOM.className = 'reviewer-switch-container';

        const parentDOM = document.createElement('div');
        parentDOM.className = 'reviewer-container hide';
        parentDOM.innerHTML = `<div class="reviewr-mask"></div>
            <div id="draw-machine" style="background-image: url('${chrome.extension.getURL('images/draw_card.jpg')}');">
            <div class="background-mask"></div>
        </div>`;

        const handleClose = (evt) => {
            parentDOM.classList.add('hide');
            parentDOM.querySelectorAll('#draw-machine .monsters-container').forEach((ele) => {
                ele.classList.add('hide');
            });
        };

        const reviewerMask = parentDOM.childNodes[0].addEventListener('click', handleClose);

        document.body.appendChild(buttonDOM);
        document.body.appendChild(parentDOM);
        this.elems.buttonDOM = buttonDOM;
        this.elems.parentDOM = parentDOM;
    }

    renderAncientCoinSeal() {
        const monsterContainer = document.createElement('div');
        monsterContainer.className = 'monsters-container hide';
        monsterContainer.classList.add('ancient-coin-seal');
        monsterContainer.innerHTML = `
                <h1>古幣封印</h1>
                <div>
                    <div class="left">
                        <div class="part part-1"></div>
                        <div class="part part-2"></div>
                        <div class="part part-3">
                            <img src="${chrome.extension.getURL('images/pompeii.jpg')}" width="383" height="200">
                        </div>
                    </div>
                    <div class="right"></div>
                </div>`;

        const reviewrButton = document.createElement('button');
        reviewrButton.className = 'reviewer-switch';
        reviewrButton.innerText = `古幣封印`;
        const self = this;
        reviewrButton.addEventListener('click', (evt) => {
            if (monsterContainer.classList.contains('hide')) {
                // 打開
                if (self.elems.parentDOM.classList.contains('hide')) {
                    self.elems.parentDOM.classList.remove('hide');
                }
                self.elems.parentDOM.querySelectorAll('#draw-machine .monsters-container').forEach((ele) => {
                    ele.classList.add('hide');
                });
                monsterContainer.classList.remove('hide');
            } else {
                // 關閉
                monsterContainer.classList.add('hide');
                self.elems.parentDOM.classList.add('hide');
            }
        });

        this.elems.parentDOM.querySelector('#draw-machine').appendChild(monsterContainer);
        this.elems.buttonDOM.appendChild(reviewrButton);

        const left = {
            part1 : [
                1189, 1190, 1719,
                1626, 1439, 1440,
            ],
            part2 : [
                221, 223, 225 ,227 ,229,
                1101, 1103, 1105, 1107, 1109,
                1136, 1138, 1140, 1142, 1144,
                1166, 1168, 1170, 1172, 1174,
                1221, 1223, 1225, 1227, 1229,
            ],
        };
        const right = [
            1236, 1238, 1244,
            1276, 1278, 1290,
            1426, 1428, 1430,
            1452, 1454, 1460,
            1473, 1475, 1477,
            1536, 1540, 1544,
            1601, 1603, 1609,
            1638, 1642, 1644,
            1671, 1673, 1679,
            1703, 1704, 1705,
        ];

        const cardHandler = (cardId) => {
            fragment.appendChild(this.generateCardImageDOM(cardId));
        };

        let fragment = document.createDocumentFragment();
        left.part1.forEach(cardHandler);
        monsterContainer.querySelector('.left .part.part-1').appendChild(fragment);

        fragment = document.createDocumentFragment();
        left.part2.forEach(cardHandler);
        monsterContainer.querySelector('.left .part.part-2').appendChild(fragment);

        fragment = document.createDocumentFragment();
        right.forEach(cardHandler);
        monsterContainer.querySelector('.right').appendChild(fragment);
    }

    renderMagicSeal() {
        const monsterContainer = document.createElement('div');
        monsterContainer.className = 'monsters-container hide';
        monsterContainer.classList.add('magic-seal');
        monsterContainer.innerHTML = `
                <h1>魔法石封印</h1>
                <div>
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="bottom"></div>`;

        const reviewrButton = document.createElement('button');
        reviewrButton.className = 'reviewer-switch';
        reviewrButton.innerText = `魔法石封印`;
        const self = this;
        reviewrButton.addEventListener('click', (evt) => {
            if (monsterContainer.classList.contains('hide')) {
                // 打開
                if (self.elems.parentDOM.classList.contains('hide')) {
                    self.elems.parentDOM.classList.remove('hide');
                }
                self.elems.parentDOM.querySelectorAll('#draw-machine .monsters-container').forEach((ele) => {
                    ele.classList.add('hide');
                });
                monsterContainer.classList.remove('hide');
            } else {
                // 關閉
                monsterContainer.classList.add('hide');
                self.elems.parentDOM.classList.add('hide');
            }
        });

        this.elems.parentDOM.querySelector('#draw-machine').appendChild(monsterContainer);
        this.elems.buttonDOM.appendChild(reviewrButton);

        const magicSeal = {
            special : [
                1719,
            ],
            left : [
                1720,1721,1722,1723,1724,
                191,193,195,197,199,
                201,203,205,207,209,
                211,213,215,217,219,
                221,223,225,227,229,
                388,390,392,394,396,
                413,415,417,419,421,
                531,533,535,537,539,
                466,468,470,472,474,
                596,598,600,602,604,
                716,717,718,719,720,
                726,728,730,732,734,
                790,792,794,796,798,
                801,803,805,807,809,
            ],
            right : [
                344,346,348,367,369,
                375,355,371,363,359,
                377,357,373,365,361,
                861,863,865,867,869,
                881,883,885,887,889,
                946,948,950,952,954,
                986,988,990,992,994,
                1031,1033,1035,1037,1039,
                1056,1058,1060,1062,1064,
                1101,1103,1105,1107,1109,
                1136,1138,1140,1142,1144,
                1166,1168,1170,1172,1174,
                1221,1223,1225,1227,1229,
                1666,1667,1668,1669,1670,
            ],
            bottom : [
                1538,1542,1546,1548,1550,1536,1540,1544,
                1605,1607,1611,1613,1615,1601,1603,1609,
            ],
        };

        const cardHandler = (cardId) => {
            fragment.appendChild(this.generateCardImageDOM(cardId));
        };

        let fragment = document.createDocumentFragment();
        magicSeal.left.forEach(cardHandler);
        monsterContainer.querySelector('.left').appendChild(fragment);

        fragment = document.createDocumentFragment();
        magicSeal.right.forEach(cardHandler);
        monsterContainer.querySelector('.right').appendChild(fragment);

        fragment = document.createDocumentFragment();
        magicSeal.bottom.forEach(cardHandler);
        monsterContainer.querySelector('.bottom').appendChild(fragment);
    }

    parseCardInfo() {
        // 取得背包資料，暫時想不到更好的做法
        // 只好暴力一點，用爬 script 內字串的方式來處理
        const inventory_str = eval(document.querySelector('script[type="text/javascript"]').innerText.match(/var inventory_str = (.*)/mi)[1]),
              self = this;
        inventory_str.forEach(function (str, index) {
            // 背包編號,卡片編號,經驗值,等級,技能等級,取得時間,分解靈魂數,(不明),昇華階段,套用的SKIN編號(加上6000),技能升技百分比,技能實際CD
            let c = str.split('|');

            self.inventoryCardsInfo.push({
                id : parseInt(c[0]),
                cardId : parseInt(c[1]),
                exp : parseInt(c[2]),
                level : parseInt(c[3]),
                skLevel : parseInt(c[4]),
                createdAt : parseInt(c[5]),
                soul : parseInt(c[6]),
                unknown : parseInt(c[7]),
                refineLevel : parseInt(c[8]),
                skinId : parseInt(c[9]),
                skExp : parseInt(c[10]),
                normalSkillCd : parseInt(c[11]),
            });

            self.inventoryCards.push(parseInt(c[1]));
        });
    }

    /**
     * cardExist 遞迴檢查卡片是否存在背包內
     *
     * @param cardId 卡片編號
     * @access public
     * @return boolean
     */
    cardExist(cardId) {
        if (this.inventoryCards.indexOf(cardId) >= 0) {
            return true;
        }
        if (this.searched.indexOf(cardId) >= 0) {
            return false;
        }
        this.searched.push(cardId);
        if (evoData[cardId] && evoData[cardId].length > 0) {
            for (var i = 0;i < evoData[cardId].length;i++) {
                if (this.cardExist(evoData[cardId][i])) {
                    return true;
                }
            }
        }
        if (degData[cardId] && degData[cardId].length > 0) {
            for (var i = 0;i < degData[cardId].length;i++) {
                if (this.cardExist(degData[cardId][i])) {
                    return true;
                }
            }
        }
        return false;
    }

    generateCardImageDOM(cardId) {
        this.searched = [];
        const aDOM = document.createElement('a');
        aDOM.className = 'monster-link';
        aDOM.href = `http://zh.tos.wikia.com/wiki/${cardId}`;
        aDOM.setAttribute('target', '_blank');
        aDOM.setAttribute('title', monsterNames[cardId]);

        if (! this.cardExist(cardId)) {
            aDOM.classList.add('disable');
        }

        const img = document.createElement('img');
        img.src = `${monsterImages[cardId]}`;
        img.width = 80;
        img.height = 80;
        img.setAttribute('alt', monsterNames[cardId]);

        aDOM.appendChild(img);
        return aDOM;
    }
}

class GuideLink {
    constructor() {
    }

    renderWarpbutton() {
        const player = document.querySelectorAll('.tos-player-label'),
              name = player[0].innerText,
              uid = player[1].innerText;

        const warpButton = document.createElement('button');
        warpButton.id = 'reviewer-switch';
        warpButton.innerText = `前往背包`;
        warpButton.addEventListener('click', function() {
            location.href = `http://review.towerofsaviors.com/${uid}`;
        });

        document.body.appendChild(warpButton);
    }
}

function isMainPage(url = '') {
    const pattern = /http:\/\/review\.towerofsaviors\.com\/mainq\?([0-9a-z]+)/mi;
    return pattern.exec(url ? url : location.href);
}
function isBag(url = '') {
    const pattern = /http:\/\/review\.towerofsaviors\.com\/([0-9]+)/mi;
    return pattern.exec(url ? url : location.href);
}

const reviewer = new CardReviewer();

if (isMainPage()) {
    // 如果是我的主頁
    const guideLink = new GuideLink();
    guideLink.renderWarpbutton();
} else if (isBag()) {
    // 如果是背包
    reviewer.parseCardInfo();
    reviewer.renderReviewerDOM();
    reviewer.renderMagicSeal();
    reviewer.renderAncientCoinSeal();
}

const drawMachine = document.querySelector('#draw-machine'),
      reviewerMask = document.querySelector('.reviewr-mask'),
      deviceHeight = document.body.scrollHeight;
function resetContainerHeihgt() {
    const container = document.querySelector('#draw-machine .monsters-container:not(.hide)'),
          containerHeight = container ? container.scrollHeight : 0;
          height = Math.max(containerHeight, deviceHeight) + 'px';
    window.scrollTo(0, 0);
    drawMachine.style.height = height;
    reviewerMask.style.height = height;
}

window.addEventListener('resize', resetContainerHeihgt, true);
document.querySelectorAll('button.reviewer-switch').forEach((ele) => {
    ele.addEventListener('click', resetContainerHeihgt);
});
resetContainerHeihgt();