import { RADIX_36_BASE_NUMBER_SYSTEM, FRACTIONAL_RANGE } from '../constants/constants.js';

function get36BaseRadixRandomNumber() {
    return Math.random().toString(RADIX_36_BASE_NUMBER_SYSTEM).slice(FRACTIONAL_RANGE.start, FRACTIONAL_RANGE.end);
}
export function generateKey() {
    return get36BaseRadixRandomNumber() + get36BaseRadixRandomNumber();
}
