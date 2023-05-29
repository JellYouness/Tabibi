"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
function computeNextBackoffInterval(initialBackoff, previousRetryCount, { multiplier = 1.5, randomizationFactor = 0.25, minBackoff = initialBackoff, maxBackoff = Infinity, } = {}) {
    assert_1.default(initialBackoff > 0, `The initial backoff interval must be positive`);
    assert_1.default(previousRetryCount >= 0, `The previous retry count must not be negative`);
    assert_1.default(multiplier >= 1, `The backoff multiplier must be greater than or equal to 1`);
    assert_1.default(0 <= randomizationFactor && randomizationFactor <= 1, `The randomization factor must be between 0 and 1, inclusive`);
    assert_1.default(minBackoff >= 0, `The minimum backoff interval must be positive`);
    let nextBackoff = initialBackoff * multiplier ** previousRetryCount;
    // Apply jitter within the negative to positive range of the randomization factor
    let jitterFactor = 1 - randomizationFactor + 2 * randomizationFactor * Math.random();
    return Math.min(Math.max(nextBackoff * jitterFactor, minBackoff), maxBackoff);
}
exports.computeNextBackoffInterval = computeNextBackoffInterval;
//# sourceMappingURL=backoff.js.map