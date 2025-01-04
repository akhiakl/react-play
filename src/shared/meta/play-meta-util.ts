const getAllTags = (plays: any[]) => {
  const tags = plays.reduce((acc: string | any[], play: { play_tags: any[] }) => {
    return acc.concat(
      play.play_tags.reduce((pre: any[], next: { tag: { name: any; id: any } }) => {
        return pre.concat({ tag: next.tag.name, id: next.tag.id });
      }, [])
    );
  }, []);
  const finalArr: any[] = [];
  tags.forEach((item: { id: any }) => {
    if (!finalArr.find((_) => _.id === item.id)) {
      finalArr.push(item);
    }
  });

  return finalArr;
};

export { getAllTags };
