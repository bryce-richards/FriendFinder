// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.
var form = FormApp.create('Friend Finder Survey');
var choices = ['1 (Strongly Disagree)','2','3','4','5 (Strongly Agree)'];
var questions = [
    'You enjoy outdoor activities such as hiking and camping.',
    'You consider yourself more of a cat person than a dog person.',
    'Your political views would most closely align with right-wing/conservative.',
    'You enjoy playing or watching sports.',
    'You care a lot about what other people think about you.',
    'You enjoy playing video games',
    'On the weekends, you like going to the club and dancing.',
    'You enjoy large parties versus more intimate gatherings.',
    'You work well under pressure.',
    'You consider yourself to be an artistic person.'
];

form.addSectionHeaderItem()
    .setTitle('About You');
form.addTextItem()
    .setTitle('Full Name (Required)');
form.addTextItem()
    .setTitle('Link to Photo Image (Required)');

for (var i = 0; i < questions.length; i++) {
    form.addSectionHeaderItem()
        .setTitle('Question #' + (parseInt(i) + 1));
    form.addMultipleChoiceItem()
        .setTitle(questions[i])
        .setChoiceValues(choices);
}
