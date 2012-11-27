;(function($) {

	// Document ready
	$(function() {
		$(".gform_wrapper form").labelfy();
	});

	/**
	 * Labelfy
	 *
	 * Faux placeholder text for forms. Built for adding in-field labels to Gravity Forms
	 * but works for any form that it's applied too with properly marked up labels with
	 * for attributes pointing to an input with an ID of the same value.
	 *
	 */
	
	$.fn.labelfy = function(options) {

		var settings = $.extend({
			'focusClass' : 'input-focused',
			'blurClass'  : 'input-blurred'
		}, options);

		return this.each(function() {

			// Maintain chainability
			var $this = $(this);

			// Iterate over each label in the form and apply our labelFactory function
			$this.find('label').each(function(i, value) {
				labelFactory($(this));
			});

			/**
			 * Label Factory
			 *
			 * This is where the magic happens. The placeholders and labels
			 * become one and everything comes together to form an element
			 * with a magical placeholder.
			 *
			 */
			function labelFactory(label) {

				// Get the for attribute value
				var forAttr = label.attr('for');

				// If we have a for attribute value
				if (typeof forAttr !== 'undefined') {

					// Find the element this label is for
					var theInput = $("#" + forAttr);

					// Get the text value of the label
					var labelText = label.text();

					// The parent form for validation purposes
					var theParent = theInput.parents('form');

					// The input doesn't exist, do a look up by name
					if (!theInput) {
						// Maybe the user opted for name attributes instead of an ID?
						var inputSearchlight = $("input[name='"+forAttr+"'], textarea[name='"+forAttr+"']");

						// The user has correctly added name values without ID's no big deal.
						if (inputSearchlight) {
							theInput = inputSearchlight;
						}
					}

					// If the form has a class of no-labelfy, don't bother
					if (!theParent.hasClass('no-labelfy')) {
						// Our element has passed the test
						if (isValidInput(theInput)) {

							// Remove the label, it's not needed any more
							label.remove();

							// Set the value of our input to be that of the label text
							theInput.val(labelText);

							// If the user focuses their mouse into the field
							theInput.on("focus", function() {
								// Add our classes
								theInput.removeClass(settings.blurClass).addClass(settings.focusClass);

								// If the vlaues match, clear
								if (theInput.val() == labelText) {

									// Empty value
									theInput.val("");
								}
							});

							// When the users leaves the text field
							theInput.on("blur", function() {
								// Add our classes
								theInput.addClass(settings.blurClass).removeClass(settings.focusClass);

								// Is the label empty?
								if (theInput.val() == '') {
									// Repopulate with the label value
									theInput.val(labelText);
								}
							});

							// If the parent form submits and our default value is there
							theParent.on("submit", function() {

								// We don't want our default value tricking form validation
								if (theInput.val() == labelText) {
									// Empty the field
									theInput.val("");
								}
							});
						}
					}

				}
			}

			/**
			 * Is Valid Input
			 *
			 * Checks if a supplied value is a valid input we can create our faux
			 * placeholder on. Checks for fields that aren't hidden mostly, but also
			 * ensures that the "no-labelfy" class hasn't been added to our input.
			 *
			 */
			function isValidInput(input) {

				// If our input an an input or textarea and we want to labelfy, proceed
				if (input.is('input') || input.is('textarea') && !input.hasClass('no-labelfy')) {

					// Is this an input only? Check it's valid
					if (input.is('input')) {

						// Sometimes forms use HTML5 markup which is fine, but we need to check for it
						if (input.attr('type') == 'text' || input.attr('type') == 'email' || input.attr('type') == 'tel' || input.attr('type') == 'date') {
							return true;
						} else {
							return false;
						}

					} else if (input.is('textarea')) {
						return true;
					}

				} else {
					return false;
				}

			}

		});

	}

})(jQuery);