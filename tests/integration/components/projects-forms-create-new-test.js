import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('projects-forms-create-new', 'Integration | Component | projects forms create new', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{projects-forms-create-new}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#projects-forms-create-new}}
      template block text
    {{/projects-forms-create-new}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
