var pageBg = document.querySelector("body");
        var sliders = document.getElementsByTagName("input");
        var rgb = [0, 0, 0];
        var randomizeBtn = document.getElementById("randomize");
        var interval;

        function changeColor() {
            var randomRgb = [0, 0, 0].map(function() {
                return Math.floor(Math.random() * 256);
            });
            updateSliders(randomRgb);
            var newCSS = writeCSS(randomRgb);
            pageBg.style.backgroundColor = newCSS;
        }

        function updateSliders(rgbArray) {
            for (var i = 0; i < sliders.length; i++) {
                sliders[i].value = rgbArray[i];
            }
            rgb = rgbArray;
        }

        randomizeBtn.addEventListener("click", function() {
            if (interval) {
                clearInterval(interval);
                interval = null;
                this.textContent = "Randomize Color";
            } else {
                this.textContent = "Stop Randomizing";
                interval = setInterval(changeColor, 2000);
            }
        });

        for (var i = 0; i < sliders.length; i++) {
            sliders[i].oninput = function() {
                var whichSlider = this.getAttribute("id");
                var sliderValue = this.value;
                var newRgb = changeRgb(whichSlider, sliderValue);
                var newCSS = writeCSS(newRgb);
                pageBg.style.backgroundColor = newCSS;
            };
        }

        function changeRgb(channel, value) {
            switch (channel) {
                case 'red': rgb[0] = parseInt(value); break;
                case 'green': rgb[1] = parseInt(value); break;
                case 'blue': rgb[2] = parseInt(value); break;
            }
            return rgb;
        }

        function writeCSS(newRgb) {
            return `rgb(${newRgb.join(',')})`;
        }