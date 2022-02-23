import {DOMCacheGetOrSet} from './Cache/DOM';
import {buyShopUpgrades, canBuy, getShopCosts, resetShopUpgrades, ShopUpgradeNames} from './Shop';
import {Notification} from './UpdateHTML';
import {changeTalismanModifier, respecTalismanConfirm} from './Talismans';
import {player} from './Synergism';
import {Globals as G} from './Variables';

export function autoAdd() {
    DOMCacheGetOrSet('promocodes').click();
    (DOMCacheGetOrSet('prompt_text') as HTMLInputElement).value = 'add';
    DOMCacheGetOrSet('ok_prompt').click();
    (DOMCacheGetOrSet('prompt_text') as HTMLInputElement).value = '9999';

    setTimeout(() => {
        DOMCacheGetOrSet('ok_prompt').click();
    }, 16);
}

export function autoDaily() {
    DOMCacheGetOrSet('promocodes').click();
    (DOMCacheGetOrSet('prompt_text') as HTMLInputElement).value = 'daily';
    DOMCacheGetOrSet('ok_prompt').click();
}

export function talismanRespec(talismans: [number, number, number]) {
    if (player.runeshards < 400000) return Notification('Unsuccessful respec');

    for (let i = 1; i <= 7; i++) {
        if (G['mirrorTalismanStats'][i] === -1) {
            changeTalismanModifier(i);
        }
    }

    new Array(5).fill(0).forEach((_x, index) => {
        if (!talismans.includes(index + 1)) {
            changeTalismanModifier(index + 1);
        }
    });

    respecTalismanConfirm(7);

    void Notification('Successful ' + talismans.join('/') + ' respec', 3000);
}

export function autoBuyOfferings(recursive = false) {
    let bought = false;

    if (!recursive) {
        void resetShopUpgrades()
    }

    const items: { upgrade: ShopUpgradeNames, perPercent: number }[] = [
        {upgrade: 'offeringEX', perPercent: getShopCosts('offeringEX') / 4},
        {upgrade: 'offeringAuto', perPercent: getShopCosts('offeringAuto') / 2},
        {upgrade: 'cashGrab', perPercent: getShopCosts('cashGrab')},
    ];

    items.sort((a, b) => a.perPercent - b.perPercent).forEach(item => {
        if (bought) return;

        if (canBuy(item.upgrade)) {
            void buyShopUpgrades(item.upgrade);
            bought = true;
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (bought) {
        autoBuyOfferings(true)
    } else {
        void Notification('Bought offerings', 2000);
    }
}

export function autoBuyObtainium(recursive = false) {
    let bought = false;

    if (!recursive) {
        void resetShopUpgrades()
    }

    const items: { upgrade: ShopUpgradeNames, perPercent: number }[] = [
        {upgrade: 'obtainiumEX', perPercent: getShopCosts('obtainiumEX') / 4},
        {upgrade: 'obtainiumAuto', perPercent: getShopCosts('obtainiumAuto') / 2},
        {upgrade: 'cashGrab', perPercent: getShopCosts('cashGrab')},
    ];

    items.sort((a, b) => a.perPercent - b.perPercent).forEach(item => {
        if (bought) return;

        if (canBuy(item.upgrade)) {
            void buyShopUpgrades(item.upgrade);
            bought = true;
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (bought) {
        autoBuyObtainium(true)
    } else {
        void Notification('Bought obtainium', 2000);
    }
}
