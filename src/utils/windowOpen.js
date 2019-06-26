const windowOpen = {
    open: function (url) {
        let newA = document.createElement('a');
        newA.target = '_blank';
        newA.href = url;
        document.body.appendChild(newA);
        newA.click();
        document.body.removeChild(newA);
    },
    openSelf: function (url) {
        let newA = document.createElement('a');
        newA.target = '_self';
        newA.href = url;
        document.body.appendChild(newA);
        newA.click();
        document.body.removeChild(newA);
    }
};

export default windowOpen;
