const splitAllWhen = <A>(arr: A[], pred: (item: A) => boolean): A[][] => {
  return arr.reduce((acc: A[][], item: A) => {
    let lastRow = acc[acc.length - 1];
    if (lastRow == null) {
      lastRow = [item];
      acc.push(lastRow);
      return acc;
    }

    if (pred(item)) {
      acc.push([item]);
    } else {
      lastRow.push(item);
    }
    return acc;
  }, []);
};

export default splitAllWhen;
