import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('line-graph-with-legend', 'Integration | Component | line graph with legend', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{line-graph-with-legend}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#line-graph-with-legend}}
      template block text
    {{/line-graph-with-legend}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
