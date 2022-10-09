// Donate page

const allRadioItems = document.querySelectorAll('.radio-input');
const inputSum = document.querySelector('.donate-custom-sum');
const formDonate= document.querySelector('.form-donate')


inputSum.addEventListener('input', function(event) {
    allRadioItems.forEach(radio => {
        radio.checked = false;
        if (radio.value === inputSum.value) {
            radio.checked = true;
        }
    })
});

allRadioItems.forEach(item => {
    item.addEventListener('click', function() {
        item.checked = true;
        inputSum.value = item.value
    })
});