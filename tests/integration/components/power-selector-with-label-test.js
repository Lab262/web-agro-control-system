import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('power-selector-with-label', 'Integration | Component | power selector with label', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{power-selector-with-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#power-selector-with-label}}
      template block text
    {{/power-selector-with-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
