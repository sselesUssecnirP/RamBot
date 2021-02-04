module.exports = {
      sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      },

      getMember(message, toFind = '') {
          toFind = toFind.toLowerCase();

          
          let target = message.guild.members.fetch(toFind);

          if (!target && message.mentions.members)
              target = message.mentions.members.first()

          if (!target && toFind) {
              target = message.guild.members.cache.find(member => {
                  return member.displayName.toLowerCase().includes(toFind) || 
                  member.user.tag.toLowerCase().includes(toFind)
              });
          }

          if (!target)
              target = message.member
    
      },

      formatDate(date) {
          return new Intl.DateTimeFormat('en-US').format(date);
      }
}