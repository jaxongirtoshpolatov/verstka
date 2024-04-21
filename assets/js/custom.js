// ! phone mask
[].forEach.call(document.querySelectorAll('.tel'), function (input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault()
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
    input.addEventListener('mouseup', event => {
      event.preventDefault()
      if (input.value.length < 4) {
        input.setSelectionRange(4, 4)
      } else {
        input.setSelectionRange(input.value.length, input.value.length)
      }
    })
});

// ! checkbox script
const checkBox = document.querySelector('.check-box');

checkBox.addEventListener('click', () => {
    checkBox.classList.toggle('checked');
})

// ! search panel script
let searchPanel, closeBtn, search, input, clearVal, clearBox;

searchPanel = document.querySelector('.search-panel');
closeBtn = searchPanel.querySelector('.close');
search = document.querySelector('.header-search');

// ? open search panel
search.addEventListener('click', () => {
    searchPanel.classList.add('active');
})

// ? close search panel
closeBtn.addEventListener('click', () => {
    searchPanel.classList.remove('active');
})

// ? active input script
input = searchPanel.querySelector('form input');
clearBox = searchPanel.querySelector('.clear');
clearVal = searchPanel.querySelector('.clear-input');


input.addEventListener('input', (e) => {
    if (e.target.value){
        clearBox.style.display = 'block';
    }else {
        clearBox.style.display = 'none'
    }
    // ? clear input script
    clearVal.addEventListener('click', (event) => {
        e.target.value = "";
        event.preventDefault();
    })
})


