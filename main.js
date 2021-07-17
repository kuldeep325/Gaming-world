// registeration form validations
$(document).ready(function() {

	$("#email-register").focus();
	$("#register_form").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
                pattern: '^[a-zA-Z0-9]+$',
				minlength: 6
			},
			verify: {
				required: true,
				equalTo: "#password-register"
			},
			first_name: {
				required: true,
				pattern:'^[A-Za-z.]{3,30}'
			},
			last_name: {
				required: true,
				pattern:'^[A-Za-z.]{3,30}'
			},
			state: {
				required: true,
				rangelength: [2,2]
			},
			zip: {
				required: true,
				rangelength: [5, 10]
			},
			phone: {
				required: true,
				pattern:'^[0-9]{10}$'
			},
		}
	}); // end validate
// end ready
});