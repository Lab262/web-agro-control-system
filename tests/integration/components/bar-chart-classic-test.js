import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bar-chart-classic', 'Integration | Component | bar chart classic', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bar-chart-classic}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bar-chart-classic}}
      template block text
    {{/bar-chart-classic}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
