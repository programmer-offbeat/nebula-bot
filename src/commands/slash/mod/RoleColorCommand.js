const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RoleColorCommand extends Command {
  constructor() {
    super({
      name: 'rolecolor',
      arguments: 2,
      aliases: [],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageRoles']
      }],
      slash: new CommandBase()
        .setName('rolecolor')
        .setDescription('Changes the color of a role.')
        .addOptions(
          new CommandOptions()
            .setType(7)
            .setName('role')
            .setDescription('Mention role on server.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('color')
            .setDescription('For example: #f55f96')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const getRole = ctx.args[0]?.toLowerCase()
    const role = ctx.message.guild.roles.find(role => role.name.toLowerCase().includes(getRole)) || ctx.message.guild.roles.get(getRole.replace(/[<@&>]/g, ''))
    const color = ctx.args[1]
    if (!role) return ctx.replyT('error', 'basic:invalidRole')
    if (!color?.startsWith('#')) return ctx.replyT('error', 'commands:rolecolor.invalidColor')

    try {
      await role.edit({
        color: parseInt(`0x${color.replace('#', '').toString(16)}`)
      })
      ctx.replyT('success', 'commands:rolecolor.colorChanged')
    } catch {
      ctx.replyT('error', 'commands:rolecolor.higher')
    }
  }
}
