export const showSpiner = () => {
    const body = document.getElementsByTagName('body')[0];
    const wrapperSpiner = document.createElement('div');
    const spinerBlock = document.createElement('div');
    const spiner1 = document.createElement('div');

    wrapperSpiner.className = 'spiner';
    spinerBlock.className = 'spiner__block';
    spiner1.className = 'loader';

    body.append(wrapperSpiner);
    wrapperSpiner.append(spinerBlock);
    spinerBlock.append(spiner1)
}

export const hideSpiner = () => {
    const wrapperSpiner = document.querySelector('.spiner');
    wrapperSpiner.remove();
}
