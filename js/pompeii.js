class Pompeii {
    constructor() {
        this.elems = {};
        this.inventoryCardsInfo = [];
        this.inventoryCards = [];
        this.searched = [];

        this.injectCSS();
        this.renderReviewerDOM();
        this.parseCardInfo();
        this.generateAncientCards();
    }

    injectCSS() {
        // inject css code
        const pompeiiCss = document.createElement('link');
        pompeiiCss.setAttribute('rel', 'stylesheet');
        pompeiiCss.setAttribute('type', 'stylesheet');
        pompeiiCss.setAttribute('href', chrome.extension.getURL('css/pompeii.css'));
        document.head.appendChild(pompeiiCss);
    }

    renderReviewerDOM() {
        // create reviewr-container & button
        const parentDOM = document.createElement('div');
        parentDOM.className = 'reviewr-container hide';
        parentDOM.innerHTML = `<div id="draw-machine" style="background-image: url('${chrome.extension.getURL('images/draw_card.jpg')}');">
            <div class="monsters-container">
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
                </div>
            </div>
            <div class="background-mask"></div>
        </div>`;

        const reviewrButton = document.createElement('button');
        reviewrButton.id = 'reviewer-switch';
        reviewrButton.innerText = `查看卡匣`;
        reviewrButton.addEventListener('click', function() {
            parentDOM.classList.toggle('hide');
        });

        document.body.appendChild(reviewrButton);
        document.body.appendChild(parentDOM);
        this.elems.parentDOM = parentDOM;
        this.elems.reviewrButton = reviewrButton;
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

    generateAncientCards() {
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
        this.elems.parentDOM.querySelector('.left .part.part-1').appendChild(fragment);

        fragment = document.createDocumentFragment();
        left.part2.forEach(cardHandler);
        this.elems.parentDOM.querySelector('.left .part.part-2').appendChild(fragment);

        fragment = document.createDocumentFragment();
        right.forEach(cardHandler);
        this.elems.parentDOM.querySelector('.right').appendChild(fragment);
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

new Pompeii();
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
