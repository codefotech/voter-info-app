// this modal code requires phoneNumberInfo id based div. When that div is set uncomment below code
// let phoneNumberInfo = new bootstrap.Modal(
// 	document.getElementById('phoneNumberInfo'),
// 	{}
// );

// phoneNumberInfo.show();

var page = 1;

$('.elc-info-form').validate({
	ignore: ':hidden',
	rules: {
		// name: {
		// 	required: true,
		// },
		// dob: {
		// 	required: true,
		// },
		union_no: {
			required: true,
		},
	},
	messages: {
		// name: 'à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦® à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨',
		// dob: 'à¦†à¦ªà¦¨à¦¾à¦° à¦œà¦¨à§à¦® à¦¤à¦¾à¦°à¦¿à¦– à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨',
		union_no: 'à¦†à¦ªà¦¨à¦¾à¦° à¦‡à¦‰à¦¨à¦¿à¦¯à¦¼à¦¨ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦° à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨',
	},
	errorPlacement: function(error, element) {
        if (element.attr("name") == "union_no") {
            error.insertAfter("#select_union_no");
        } else {
            error.insertAfter(element);
        }
    },
	submitHandler: function (form) {
		phoneNumberInfo.show();
	},
});
// Add phone number validation
$.validator.addMethod(
	'phoneUS',
	function (phone_no, element) {
		phone_no = phone_no.replace(/\s+/g, '');
		return (
			this.optional(element) ||
			(phone_no.length > 10 &&
				phone_no.match(
					/^(?:\+?\d{1,4}[\s-]?)?(?:\(\d{1,3}\)|\d{1,4})[\s-]?\d{1,4}[\s-]?\d{1,9}$/
				))
		);
	},
	'à¦†à¦ªà¦¨à¦¾à¦° à¦¸à¦ à¦¿à¦• à¦«à§‹à¦¨ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦° à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨'
);

$('.user-info-data-box').addClass('d-none');
$('.info-card-data-box').removeClass('d-none');

$('.phone-number-form').validate({
	ignore: ':hidden',
	rules: {
		phone_no: {
			required: true,
			phoneUS: true,
		},
	},
	messages: {
		phone_no: 'à¦†à¦ªà¦¨à¦¾à¦° à¦¸à¦ à¦¿à¦• à¦«à§‹à¦¨ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦° à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨',
	},
	submitHandler: function (form) {
		// Prepare data from both forms
		const voterInfo = $('.elc-info-form').serialize();
		const phoneNum = $('.phone-number-form').serialize();
		const formData = voterInfo + '&' + phoneNum;

		// Send API request
		$.ajax({
			url: 'your_api_endpoint',
			type: 'POST',
			data: formData,
			success: function (response) {
				// hide phone number modal
				phoneNumberInfo.hide();

				// reset form data
				$('.elc-info-form')[0].reset();
				$('.phone-number-form')[0].reset();
				// Handle success (e.g., show a success message)
				console.log('API request successful!');

				// show hide form data
				$('.user-info-data-box').removeClass('d-none');
				$('.info-card-data-box').addClass('d-none');
			},
			error: function (error) {
				// Handle error (e.g., show an error message)
				console.log('API request failed!');

				// reset form data
				$('.elc-info-form')[0].reset();
				$('.phone-number-form')[0].reset();

				// hide phone number modal
				phoneNumberInfo.hide();

				// show hide form data
				$('.user-info-data-box').removeClass('d-none');
				$('.info-card-data-box').addClass('d-none');
			},
		});
	},
});


document.getElementById('dob').addEventListener('input', function(e) {
	var input = this.value;
	var convertedInput = convertToBengaliDigits(input);
	var formattedInput = formatBengaliDateWhileTyping(convertedInput);
	this.value = formattedInput;
});

document.getElementById('dob').addEventListener('keydown', function(e) {
	if (e.key === 'Backspace') {
		var input = this.value;
		if (input.length > 0) {
			var lastChar = input.slice(-1);
			if (lastChar === '/' || lastChar === 'à§¦' || lastChar === 'à§§' || lastChar === 'à§¨' || lastChar === 'à§©' || lastChar === 'à§ª' || lastChar === 'à§«' || lastChar === 'à§¬' || lastChar === 'à§­' || lastChar === 'à§®' || lastChar === 'à§¯') {
				this.value = input.slice(0, -1);
			}
		}
	}
});

function convertToBengaliDigits(input) {
	var englishDigits = '0123456789';
	var bengaliDigits = 'à§¦à§§à§¨à§©à§ªà§«à§¬à§­à§®à§¯';

	for (var i = 0; i < englishDigits.length; i++) {
		input = input.replace(new RegExp(englishDigits[i], 'g'), bengaliDigits[i]);
	}

	return input;
}

function formatBengaliDateWhileTyping(input) {
	input = input.replace(/[/-]/g, ''); // Remove existing hyphens and slashes

	var formattedInput = '';
	for (var i = 0; i < input.length; i++) {
		formattedInput += input[i];
		if (i === 1 || i === 3) {
			formattedInput += '/';
		}
	}

	return formattedInput;
};

// Submit button click & scroll
// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelector(".submit-btn").addEventListener("click", function() {
//         // document.querySelector("#voterList").scrollIntoView({ behavior: "smooth", block: "start" });
// 		// let offset = 200; // Set your desired offset here
// 		let voterList = document.querySelector("#voterList");
// 		if (voterList) {
// 			// let topPos = voterList.getBoundingClientRect().top + window.scrollY;
// 			window.scrollTo({ top: 0, behavior: "smooth" });
// 		}
//     });
// });

// $(document).ready(function() {
//     var tableContainer = $("#voterList");
//     if (tableContainer.length > 0) {
//         var offsetTop = tableContainer.offset().top;
//         $('html, body').animate({ scrollTop: offsetTop }, 'slow');
//     } else {
//         console.error("Element with class 'table-container' not found.");
//     }
// });

$("#union_no").change(function () {
	if ($("#union_no").val() != "") {
		$.ajax({
			url: BASE_URL + '?action=fetchWard&union_no=' + $("#union_no").val(),
			type: 'GET',
			success: function (response) {
				$("#ward-list-div").html(response);
			},
			error: function (error) {
				// Handle error (e.g., show an error message)
				console.log('API request failed!');
			},
		});
	} else {
		$("#ward-list-div").html('');
	}
});


$(document).on('click', '#more-info-button', function () {
	loadVoteList(++page, "");
});

$(document).on('click', '#more-info-mobile-button', function () {
	loadVoteList(++page, "");
});

// load vote info list
$(".submit-btn").click(function () {
	page = 1;
	loadVoteList(page, "clear");
});

$(document).on('click', '.download-btn', function () {
	var dataId = $(this).attr('data-id');
	generateImage(dataId);
});


function loadVoteList(page, clear = "") {
	if ($('.elc-info-form').valid()) {
		const form = $('.elc-info-form');

		const formData = {};

		form.find('input, select, textarea').each(function () {
			const name = $(this).attr('name');
			const value = $(this).val();

			formData[name] = value;
		});
		$.ajax({
			url: BASE_URL + '?action=voter&page=' + page,
			type: 'POST',
			data: formData,
			success: function (response) {
				let tableContainer = $("#voterList");
				if (tableContainer.length > 0 && page == 1) {
					let offsetTop = tableContainer.offset().top;
					$('html, body').animate({ scrollTop: offsetTop }, { behavior: "smooth" });
				}

				// reset form data
				//$('.elc-info-form')[0].reset();

				if (page > 1) {
					$(".more-info-tr").remove();
				}

				if ($(window).width() < 992 && page > 1) {
					$(".more-info-mobile-content").remove();
				}

				if (clear != "") {
					$("#voterList").empty();
				}

				$("#voterList").append(response);
			},
			error: function (error) {
				// Handle error (e.g., show an error message)
				console.log('API request failed!');
			},
		});
	}
}


// const downloadButton = document.querySelector('.download-btnx');

// if (downloadButton) {
// 	downloadButton.addEventListener('click', function () {
// 		// Create an anchor element
// 		var downloadLink = document.createElement('a');
// 		// Set the href attribute to the image URL
// 		downloadLink.href = BASE_PATH + 'assets/img/center-info.png'; // Replace 'image.jpg' with your image URL
// 		// Set the download attribute to specify the file name
// 		downloadLink.download = 'center-info.png';
// 		// Append the anchor element to the body
// 		document.body.appendChild(downloadLink);
// 		// Trigger a click event on the anchor element
// 		downloadLink.click();
// 		// Remove the anchor element from the body
// 		document.body.removeChild(downloadLink);
// 	});
// }

function splitText(text, maxWidth, ctx) {
    var words = text.split(' ');
    var lines = [];
    var line = '';

    words.forEach(function(word) {
        var testLine = line + word + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && line.length > 0) {
            lines.push(line);
            line = word + ' ';
        } else {
            line = testLine;
        }
    });
    lines.push(line);
    return lines;
}


// js code for downloading image
async function writeTextOnImage(image, text = "", dataID) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = image.width;
	canvas.height = image.height;

	// Draw the loaded image onto the canvas
	ctx.drawImage(image, 0, 0);

	var fontUrl = BASE_PATH + 'assets/test/Siyam_Rupali_ANSI.ttf';

	var font = new FontFace('BanglaFont', 'url(' + fontUrl + ')');
	
	// Set font properties
	ctx.font = '60px BanglaFont'; // Adjust font size and family as needed
	ctx.fillStyle = '#000'; // Text color
	
	// Write Bangla text
	var positions = [
		{ x: 120, y: 2850 },
		{ x: 120, y: 2950 },
		{ x: 120, y: 3050 },
		{ x: 120, y: 3150 },
		{ x: 120, y: 3250 },
		{ x: 120, y: 3350 }
	];
	
	var colon_positions = [
		{ x: 400, y: 2850 },
		{ x: 400, y: 2950 },
		{ x: 400, y: 3050 },
		{ x: 400, y: 3150 },
		{ x: 400, y: 3250 },
		{ x: 400, y: 3350 }
	];

	var info_positions = [
		{ x: 450, y: 2850 },
		{ x: 450, y: 2950 },
		{ x: 450, y: 3050 },
		{ x: 450, y: 3150 },
		{ x: 450, y: 3250 },
		{ x: 450, y: 3350 }
	];

	// Texts
	var label_texts = [
		"à¦•à§à¦°à¦®à¦¿à¦•",
		"à¦¨à¦¾à¦®",
		"à¦ªà¦¿à¦¤à¦¾/à¦¸à§à¦¬à¦¾à¦®à§€",
		"à¦ à¦¿à¦•à¦¾à¦¨à¦¾",
		"à¦­à§‹à¦Ÿ à¦•à§‡à¦¨à§à¦¦à§à¦°"
	];

	var text_colons = ":";

	// var info_texts = [
	// 	"à§«à§¬à§ªà§§",
	// 	"à¦®à§‹à¦ƒ à¦†à¦¬à§à¦¦à§à¦² à¦¹à¦¾à¦‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¦¨",
	// 	"à¦®à§‹à¦ƒ à¦†à¦¬à§à¦¦à§à¦² à¦¹à¦¾à¦‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾à¦¨",
	// 	"à¦¬à¦¿-à§¨à§¯, à¦œà¦¹à§à¦°à§€ à¦®à¦¹à¦²à§à¦²à¦¾, à¦®à¦¾à¦¦à¦¾à¦°à§€à¦ªà§à¦° à¦¸à¦¦à¦°",
	// 	"à¦¶à¦¿à¦°à¦–à¦¾à¦¡à¦¼à¦¾ à¦ªà§à§°à¦¾à¦¥à¦®à¦¿à¦• à¦¬à¦¿à¦¦à§à¦¯à¦¾à¦²à¦¯à¦¼"
	// ];

	var info = $("#voter-info-"+dataID).text();

	info = info.replace(/^\s+/, '');

	var info_texts = info.split("split");

	for (var i = 0; i < label_texts.length; i++) {
		ctx.fillText(label_texts[i], positions[i].x, positions[i].y);
		ctx.fillText(text_colons, colon_positions[i].x, colon_positions[i].y);
		//ctx.fillText(info_texts[i], info_positions[i].x, info_positions[i].y);

		if (info_texts[i] != "" && info_texts[i] != null && info_texts[i] != undefined) {
			var splittedInfo = splitText(info_texts[i], 1950, ctx);
			var yPos = info_positions[i].y;

			splittedInfo.forEach(function(line) {
				ctx.fillText(line, info_positions[i].x, yPos);
				yPos += 75; 
			});
		} else {
			ctx.fillText("", info_positions[i].x, info_positions[i].y);
		}
	}
	
	const dataURL = canvas.toDataURL('image/jpeg', 0.5); // Adjust quality (0 to 1) as needed

	// Convert data URL to Blob
	const blob = await dataURLtoBlob(dataURL);

	var downloadName = 'download.jpg';

	 if ($("#voter-no-info-"+dataID).val() != "") {
		downloadName = $("#voter-no-info-"+dataID).val()+".jpg";
	 }
	saveAs(blob, downloadName);

}

function dataURLtoBlob(dataURL) {
	return new Promise((resolve, reject) => {
		const byteString = atob(dataURL.split(',')[1]);
		const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const uint8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			uint8Array[i] = byteString.charCodeAt(i);
		}
		resolve(new Blob([arrayBuffer], { type: mimeString }));
	});
}


async function generateImage(dataID) {
	const imagePath = BASE_PATH + 'assets/img/new_template.jpg'; // Path to existing image
	//const banglaText = "à¦¶à¦¿à¦°à¦–à¦¾à¦¡à¦¼à¦¾ à¦ªà§à§°à¦¾à¦¥à¦®à¦¿à¦• à¦¬à¦¿à¦¦à§à¦¯à¦¾à¦²à¦¯à¦¼";

	// Load existing image
	const image = await loadImage(imagePath);
	writeTextOnImage(image, "", dataID);
}

// Load image function
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}


