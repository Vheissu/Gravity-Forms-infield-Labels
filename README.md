Gravity-Forms-infield-Labels
============================

Gravity Forms is undeniably one of the best plugins for creating forms for Wordpress, period. However it has it's limitations. Unless you want to go digging deep swimming through custom hooks and including files, Gravity Forms doesn't support infield labels.

###What are infield labels?

The label is in the field itself when blurred or no value has been entered and when you focus in the field with your mouse pointer, the value disappears. This functionality is supported by the not-yet-widely-supported placeholder attribute for inputs, this plugin adds in the functionality for you without using HTML5 functionality so it's support everywhere.

###How do I install this?

Copy the files from this repository into wp-content/plugins/gf-infield-labels and then go into the Wordpress admin panel and activate the plugin, done.

###How do I make particular fields or forms not have infield labels?

Applying the class "no-labelfy" without the quotes to your form in the form settings of Gravity Forms will stop this plugin changing all acceptable inputs to have infield labels. If you only want particular fields not to have infield labels, applying the same class to inputs will only apply the effect to fields that don't have the class. By default this plugin converts all form input fields (text, textarea, email, tel, etc) into inform label inputs.