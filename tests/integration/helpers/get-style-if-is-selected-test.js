
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('get-style-if-is-selected', 'helper:get-style-if-is-selected', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{get-style-if-is-selected inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

