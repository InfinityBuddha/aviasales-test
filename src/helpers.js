export const compare = ({ a = 0, b = 0 }) => {
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
};

export const sortByPrice = () => (a, b) => compare({ a: a.price, b: b.price });

export const sortByDuration = () => (a, b) => compare({
    a: a.segments[0].duration + a.segments[1].duration,
    b: b.segments[0].duration + b.segments[1].duration
});

export const timeConvert = (time) => {
    const hours = (time / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return {
        hours: rhours,
        minutes: rminutes,
        'HH:mm': `${rhours}ч ${rminutes}м`
    }
};
