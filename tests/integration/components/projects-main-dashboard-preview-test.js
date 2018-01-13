import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('projects-main-dashboard-preview', 'Integration | Component | projects main dashboard preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{projects-main-dashboard-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#projects-main-dashboard-preview}}
      template block text
    {{/projects-main-dashboard-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
