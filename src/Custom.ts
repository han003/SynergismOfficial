import {DOMCacheGetOrSet} from './Cache/DOM';
import {player} from './Synergism';
import {buyShopUpgrades, getShopCosts} from './Shop';

export function autoAdd() {
    DOMCacheGetOrSet('promocodes').click();
    (DOMCacheGetOrSet('prompt_text') as HTMLInputElement).value = 'add';
    DOMCacheGetOrSet('ok_prompt').click();
    (DOMCacheGetOrSet('prompt_text') as HTMLInputElement).value = '9999';

    setTimeout(() => {
        DOMCacheGetOrSet('ok_prompt').click();
    }, 16);
}

export function autoBuyOfferings() {
    let quarks = player.worlds.QUARKS;

    // buyShopUpgrades
    let offeringEXCost = getShopCosts('offeringEX');
    let offeringAutoCost = getShopCosts('offeringAuto');
    let cashGrabCost = getShopCosts('cashGrab');

    console.log(`offeringEXCost`, offeringEXCost);
    console.log(`quarks`, quarks);

    void buyShopUpgrades('offeringEX');
}
