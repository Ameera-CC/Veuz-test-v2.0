var attributes = {
    txtSize: '',
    txtLineheight:'',
    txtcolor: '',
    txtAlignment: '',
    txtWeight : '',
    txtStyle : '',
    txtRotation:'',
    txtCordinates :'',
};

let selectedElementId = null; 

window.onload = function() {
    changePageSize();
};


function changePageSize() {
    var selectedSize = document.getElementById("pageType").value;
    var customSelect = document.getElementById("page-type-slider");
    var previewPage = document.getElementById("previewPage");
    var orientation = document.querySelector(".mode-btn.clicked").id === "landscapeBtn" ? "landscape" : "portrait";
    var width, height;

    switch (selectedSize) {
        case "A4":
            width = orientation === "landscape" ? "297mm" : "210mm";
            height = orientation === "landscape" ? "210mm" : "297mm";
            customSelect.style.display = "none";

            break;
        case "A5":
            width = orientation === "landscape" ? "210mm" : "148mm";
            height = orientation === "landscape" ? "148mm" : "210mm";
            customSelect.style.display = "none";

            break;
        case "A6":
            width = orientation === "landscape" ? "148mm" : "105mm";
            height = orientation === "landscape" ? "105mm" : "148mm";
            customSelect.style.display = "none";

            break;
            
        case "Custom":
            handleCustomOption();
            // Get the selected width and height
            width = Math.max(document.getElementById("widthRange").value, 70) + "mm";
            height = Math.max(document.getElementById("heightRange").value, 80) + "mm";

                
            // If orientation is landscape, swap width and height
            if (orientation === "landscape") {
            var temp = width;
            width = height;
            height = temp;
            }
            break;
        default:
            break;

    }

    previewPage.style.width = width;
    previewPage.style.height = height;
}

function handleCustomOption() {
    var customSelect = document.getElementById("page-type-slider");

    // var toolbarHeading = document.getElementById("toolbarHeading")
    // toolbarHeading.classList.add('toolbar-position', 'selected'); 
    customSelect.style.display = "block"; 

}

function updateTooltip(element) {
    var tooltip = element.nextElementSibling;
    console.log(element);
    tooltip.innerHTML = element.value + "mm";
}

document.addEventListener("DOMContentLoaded", function() {
    // Get references to the buttons
    const landscapeButton = document.getElementById('landscapeBtn');
    const portraitButton = document.getElementById('portraitBtn');

    function clearButtonSelection() {
        landscapeButton.classList.remove('landscape', 'clicked');
        portraitButton.classList.remove('portrait', 'clicked');
    }

    landscapeButton.addEventListener('click', function() {
        // console.log("landscapeButton clicked");
        clearButtonSelection();
        this.classList.add('landscape', 'clicked');
        changePageSize(); 
    });

    portraitButton.addEventListener('click', function() {
        // console.log("portraitButton clicked");
        clearButtonSelection();
        this.classList.add('portrait', 'clicked');
        changePageSize(); 
    });

    portraitButton.click();

});

function toggleFormatText(elementId) {

  
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const lineHeightSlider = document.getElementById('lineHeightSlider');

    const qrWidthSlider = document.getElementById('qrWidthSlider');
    const qrHeightSlider = document.getElementById('qrHeightSlider');

    qrWidthSlider.addEventListener('input', () => {
        const selectedElement = document.getElementById('qrPhoto');
        selectedElement.style.width = `${qrWidthSlider.value}px`;
    
    });
    qrHeightSlider.addEventListener('input', () => {
        const selectedElement = document.getElementById('qrPhoto');
        selectedElement.style.height = `${qrHeightSlider.value}px`;
    
    });


    fontSizeSlider.addEventListener('input', () => {
    const selectedElement = document.getElementById(selectedElementId);
    var textFontSize = `${fontSizeSlider.value}px`;
    selectedElement.style.fontSize = textFontSize;
    

    });

    lineHeightSlider.addEventListener('input', () => {
        const selectedElement = document.getElementById(selectedElementId);
        var textLineHeight = `${lineHeightSlider.value}px`;
        selectedElement.style.lineHeight = textLineHeight;
      
    });

    var designToolsSection = document.getElementById("designTools");
    var qrSizeSlider = document.getElementById("qrSizeSlider");
    var clickedItem = document.getElementById(elementId);
    var allItems = document.querySelectorAll(".profile-input");
    
    allItems.forEach(function(item) {

        item.style.borderColor = 'rgba(14, 13, 13, 0.14)';
        if(elementId !== 'qrImage'){
            document.getElementById('qrImage').style.border = 'none';
        }

    });

    if (elementId !== 'qrImage') {
        qrSizeSlider.style.display = "none";
        designToolsSection.style.display = "block";
        clickedItem.style.borderColor = '#ce558f';

    } else {
        qrSizeSlider.style.display = "block";
        designToolsSection.style.display = "none";
        clickedItem.style.border = '1px solid #ce558f';

    }
    selectedElementId = elementId;

    clearFormattingTools();

}

function updateTooltiptxt(element) {
    var tooltip = element.nextElementSibling;
    console.log(element);
    tooltip.innerHTML = element.value + "px";
}

function changeTextAlign(align) {
    var selectedElement = document.getElementById(selectedElementId);
    selectedElement.style.textAlign = align;
}

function changeFontWeight(weight) {
    var selectedElement = document.getElementById(selectedElementId);
    selectedElement.style.fontWeight = weight;
}

function changeFontStyle(style) {
    var selectedElement = document.getElementById(selectedElementId);
    selectedElement.style.fontStyle = style;
}

function changeFontColor(color) {
    var selectedElement = document.getElementById(selectedElementId);
    var colorValueSpan = document.querySelector('.color-value'); 
    selectedElement.style.color = color;
    colorValueSpan.textContent =  color;
}

function rotateNameElement() {
    const selectedElement = document.getElementById(selectedElementId);

    const rotationClasses = ['rotate-0', 'rotate-90', 'rotate-180', 'rotate-270'];
    const currentRotationClass = rotationClasses.find(cls => selectedElement.classList.contains(cls));
    if (currentRotationClass === 'rotate-270'){
        selectedElement.classList.replace(currentRotationClass, rotationClasses[0]);

    }
    else{
        const currentRotationIndex = rotationClasses.indexOf(currentRotationClass);
        selectedElement.classList.replace(currentRotationClass, rotationClasses[currentRotationIndex + 1]);
    }
  
}

$(document).ready(function(){
    $(".drag").draggable({
        containment: "#previewPage",
        opacity : 0.5

    });
    
});


function printPreview() {
    var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    var styles = '';
    stylesheets.forEach(function (stylesheet) {
        styles += '<link rel="stylesheet" href="' + stylesheet.href + '">';
    });
    var previewContent = document.getElementById('previewArea').innerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.open();

    printWindow.document.write('<html><head><title>Print Preview</title>' + styles + '</head><body>');
    printWindow.document.write('<div style="border-top: 2px solid rgba(185, 146, 146, 0.14); padding-top: 50px;">');
    printWindow.document.write(previewContent);
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// $(document).ready(function() {
//     $(".preview-area").scrollbar();
// });

/*After interview */


function clearFormattingTools() {
    // Reset font size slider
    document.getElementById("fontSizeSlider").value = 16;
    document.getElementById("fontsizeTooltip").innerText = "16px";

    // Reset line height slider
    document.getElementById("lineHeightSlider").value = 20;
    document.getElementById("lineheightTooltip").innerText = "20px";

    // Reset text alignment radio buttons
    document.querySelector('input[value="left"]').checked = false;
    document.querySelector('input[value="center"]').checked = false;
    document.querySelector('input[value="right"]').checked = false;

    // Reset font weight radio buttons
    document.querySelector('input[value="normal"]').checked = false;
    document.querySelector('input[value="light"]').checked = false;
    document.querySelector('input[value="medium"]').checked = false;
    document.querySelector('input[value="bold"]').checked = false;

    // Reset font style radio buttons
    document.querySelector('input[value="normal"]').checked = false;
    document.querySelector('input[value="italic"]').checked = false;

    // Reset font color
    document.querySelector('.color-box').value = "#ce558f";
    document.querySelector('.color-value').innerText = "#ce558f";
}



function downloadJSON(data, filename) {
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], {type: "application/json"});
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function saveData(){
    var previewElements = document.querySelectorAll('.txt-format');

    var qrImage = document.getElementById('qrPhoto');
    var qrImageStyles = window.getComputedStyle(qrImage);
    
    var data = {
        qrImage: {
            width: qrImageStyles.getPropertyValue('width'),
            height: qrImageStyles.getPropertyValue('height'),
            cordinates: qrImage.getBoundingClientRect()
        }
    };



    previewElements.forEach(function(element) {
        var elementId = element.id;
        var elementStyles = window.getComputedStyle(element);
        data[elementId] = {
            txtSize: elementStyles.getPropertyValue('font-size'),
            txtLineheight: elementStyles.getPropertyValue('line-height'),
            txtcolor: elementStyles.getPropertyValue('color'),
            txtAlignment: elementStyles.getPropertyValue('text-align'),
            txtWeight : elementStyles.getPropertyValue('font-weight'),
            txtStyle : elementStyles.getPropertyValue('font-style'),
            txtRotation: elementStyles.getPropertyValue('transform'),
            txtCordinates : element.getBoundingClientRect(),
        };
    });
    downloadJSON(data, 'attributes.json')(attributes);
}


