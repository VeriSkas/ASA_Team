export const showSpiner = () => {
    const body = document.getElementsByTagName('body')[0];
    const wrapperSpiner = document.createElement('div');
    const spinerBlock = document.createElement('div');

    wrapperSpiner.className = 'spiner';
    spinerBlock.className = 'spinner-border text-primary spiner__block';
    spinerBlock.setAttribute('role', 'status');

    body.append(wrapperSpiner);
    wrapperSpiner.append(spinerBlock);
}

export const hideSpiner = () => {
    const wrapperSpiner = document.querySelector('.spiner');
    wrapperSpiner.remove();
}
