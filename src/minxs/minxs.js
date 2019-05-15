 const minHeightMinx = {
     mounted() {
         const doc = document.body
         const sreenHeight = doc.offsetHeight;
         const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight;
         const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight;
         // const contentHeight = doc.getElementsByClassName("common")[0];
         // const bodyHeight = sreenHeight - headerHeight - footerHeight;
         // console.error(contentHeight);
         // if (contentHeight != undefined)
         //  contentHeight.style.minHeight = bodyHeight + "px";
     }
 }

 export { minHeightMinx }
