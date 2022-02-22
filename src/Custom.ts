import {DOMCacheGetOrSet} from './Cache/DOM';
import {buyShopUpgrades, canBuy, getShopCosts, resetShopUpgrades, ShopUpgradeNames} from './Shop';
import {Notification} from './UpdateHTML';

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

export function autoBuyOfferings(recursive = false) {
    let bought = false;

    if (!recursive) {
        void resetShopUpgrades()
    }

    const items: {upgrade: ShopUpgradeNames, perPercent: number}[] = [
        {upgrade: 'offeringEX', perPercent: getShopCosts('offeringEX') / 4},
        {upgrade: 'offeringAuto', perPercent: getShopCosts('offeringAuto') / 2},
        {upgrade: 'cashGrab', perPercent: getShopCosts('cashGrab')},
    ];

    items.sort((a,b) => a.perPercent - b.perPercent).forEach(item => {
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

    const items: {upgrade: ShopUpgradeNames, perPercent: number}[] = [
        {upgrade: 'obtainiumEX', perPercent: getShopCosts('obtainiumEX') / 4},
        {upgrade: 'obtainiumAuto', perPercent: getShopCosts('obtainiumAuto') / 2},
        {upgrade: 'cashGrab', perPercent: getShopCosts('cashGrab')},
    ];

    items.sort((a,b) => a.perPercent - b.perPercent).forEach(item => {
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
