import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

export function formatTimestamp(timestamp) {
    return dayjs(timestamp).format('MMM Do, YYYY [at] hh:mm a');
}