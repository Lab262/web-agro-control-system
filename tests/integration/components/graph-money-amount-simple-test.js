import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graph-money-amount-simple', 'Integration | Component | graph money amount simple', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graph-money-amount-simple}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graph-money-amount-simple}}
      template block text
    {{/graph-money-amount-simple}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
