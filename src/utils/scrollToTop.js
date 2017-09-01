const scrollToTop = () => {
  if(typeof window !== 'undefined')
    window.scrollTo(0, 0);
};

export default scrollToTop;