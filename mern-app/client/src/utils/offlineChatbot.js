import {
    monasteries,
    getSects,
    getMonasteriesBySect,
    getMonasteriesByLocation,
    findMonasteryByName
} from '../data/monasteryData';

/**
 * Offline chatbot logic using keyword matching and pattern recognition
 * @param {string} message - User's message
 * @returns {string} - Bot's response
 */
export const getOfflineResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();

    // Greeting patterns
    if (/^(hi|hello|hey|namaste|greetings)/i.test(lowerMessage)) {
        return "🙏 **Namaste! Welcome to Sikkim Monastery Heritage Guide**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📚 **What I Can Help You With:**\n\n🏛️ **Monastery Information**\n   • Details about all 15 monasteries\n   • History, architecture & significance\n   • Founding dates & key facts\n\n🎯 **Search Options**\n   • By name: \"Tell me about Rumtek\"\n   • By sect: \"Show Nyingma monasteries\"\n   • By location: \"Monasteries in Gangtok\"\n   • Special queries: \"What's the oldest monastery?\"\n\n📋 **Quick Commands**\n   • \"List all monasteries\"\n   • \"How many monasteries?\"\n   • \"Help\" - See full guide\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 Ask me anything about Sikkim's monasteries!";
    }

    // Help patterns
    if (/\b(help|what can you|how do|guide)\b/i.test(lowerMessage)) {
        return "📖 **COMPLETE GUIDE - Sikkim Monastery Chatbot**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔍 **SEARCH BY MONASTERY**\n   Examples:\n   • \"Tell me about Rumtek Monastery\"\n   • \"History of Pemayangtse\"\n   • \"Where is Enchey located?\"\n   • \"When was Tashiding founded?\"\n\n🎯 **SEARCH BY CATEGORY**\n\n   📿 By Sect:\n   • \"Show Nyingma monasteries\"\n   • \"List Kagyu sect monasteries\"\n   • \"Which sects exist in Sikkim?\"\n\n   📍 By Location:\n   • \"Monasteries in Gangtok\"\n   • \"West Sikkim monasteries\"\n   • \"Monasteries near Pelling\"\n\n   📅 By History:\n   • \"What's the oldest monastery?\"\n   • \"Which is the newest?\"\n   • \"Tell me about the largest monastery\"\n   • \"Which is the holiest monastery?\"\n\n📊 **STATISTICS & LISTS**\n   • \"How many monasteries?\"\n   • \"List all monasteries\"\n   • \"Count by sect\"\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 Just ask naturally - I'll understand!";
    }

    // List all monasteries
    if (/\b(list|show|all|every)\b.*\b(monastery|monasteries)\b/i.test(lowerMessage)) {
        const nyingmaList = monasteries.filter(m => m.sect === 'Nyingma');
        const kagyuList = monasteries.filter(m => m.sect === 'Kagyu');
        
        let response = "🏛️ **COMPLETE MONASTERY DIRECTORY**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
        
        response += `📿 **NYINGMA SECT** (${nyingmaList.length} Monasteries):\n\n`;
        nyingmaList.forEach((m, i) => {
            response += `${i + 1}. **${m.name}**\n   📍 ${m.location}\n   📅 Founded: ${m.founded}\n\n`;
        });
        
        response += `\n📿 **KAGYU SECT** (${kagyuList.length} Monasteries):\n\n`;
        kagyuList.forEach((m, i) => {
            response += `${i + 1}. **${m.name}**\n   📍 ${m.location}\n   📅 Founded: ${m.founded}\n\n`;
        });
        
        response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
        response += `📊 **Total: ${monasteries.length} Monasteries**\n\n💡 Ask about any specific monastery for detailed information!`;
        
        return response;
    }

    // Sect-based queries
    const sectMatch = lowerMessage.match(/\b(nyingma|kagyu)\b/i);
    if (sectMatch || /\bsect\b/i.test(lowerMessage)) {
        if (sectMatch) {
            const sect = sectMatch[1];
            const filtered = getMonasteriesBySect(sect);
            if (filtered.length > 0) {
                let response = `📿 **${sect.toUpperCase()} SECT MONASTERIES**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                response += `Found ${filtered.length} monasteries:\n\n`;
                
                filtered.forEach((m, i) => {
                    response += `${i + 1}. **${m.name}**\n`;
                    response += `   📍 Location: ${m.location}\n`;
                    response += `   📅 Founded: ${m.founded}\n`;
                    response += `   📜 ${m.history}\n\n`;
                });
                
                response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
                response += `💡 Click on any monastery name for more details!`;
                return response;
            }
        }
        // General sect info
        const sects = getSects();
        let response = "📿 **BUDDHIST SECTS IN SIKKIM**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
        
        sects.forEach(s => {
            const count = getMonasteriesBySect(s).length;
            const monasteryList = getMonasteriesBySect(s);
            response += `**${s} Sect:** ${count} monasteries\n`;
            response += monasteryList.slice(0, 3).map(m => `   • ${m.name}`).join('\n');
            if (count > 3) response += `\n   • ...and ${count - 3} more`;
            response += '\n\n';
        });
        
        response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
        response += "💡 Ask: \"Show Nyingma monasteries\" or \"List Kagyu sect\"";
        return response;
    }

    // Location-based queries
    const locationKeywords = ['gangtok', 'pelling', 'yuksom', 'north sikkim', 'south sikkim', 'east sikkim', 'west sikkim', 'lachung', 'lachen', 'kalimpong', 'ranka'];
    const locationMatch = locationKeywords.find(loc => lowerMessage.includes(loc));

    if (locationMatch || /\b(where|location|place|area)\b/i.test(lowerMessage)) {
        if (locationMatch) {
            const filtered = getMonasteriesByLocation(locationMatch);
            if (filtered.length > 0) {
                const locationName = locationMatch.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                let response = `📍 **MONASTERIES IN ${locationName.toUpperCase()}**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                response += `Found ${filtered.length} monastery(ies):\n\n`;
                
                filtered.forEach((m, i) => {
                    response += `${i + 1}. **${m.name}**\n`;
                    response += `   📍 ${m.location}\n`;
                    response += `   📿 Sect: ${m.sect}\n`;
                    response += `   📅 Founded: ${m.founded}\n`;
                    response += `   📜 ${m.history}\n\n`;
                });
                
                response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━";
                return response;
            }
        }
    }

    // Oldest/newest monastery queries
    if (/\b(oldest|first|earliest)\b/i.test(lowerMessage)) {
        const oldest = monasteries.reduce((prev, curr) => {
            const prevYear = parseInt(prev.founded.match(/\d{4}/)?.[0] || '9999');
            const currYear = parseInt(curr.founded.match(/\d{4}/)?.[0] || '9999');
            return currYear < prevYear ? curr : prev;
        });
        return `🏛️ **THE OLDEST MONASTERY IN SIKKIM**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**${oldest.name}**\n\n📅 **Founded:** ${oldest.founded}\n📍 **Location:** ${oldest.location}\n📿 **Buddhist Sect:** ${oldest.sect}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📜 **HISTORICAL SIGNIFICANCE:**\n\n${oldest.history}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔗 [Read more on Wikipedia](${oldest.wiki})\n\n💡 This monastery holds a special place as the first Buddhist monastery established in Sikkim, marking the beginning of Buddhist heritage in the region.`;
    }

    if (/\b(newest|latest|recent)\b/i.test(lowerMessage)) {
        const newest = monasteries.reduce((prev, curr) => {
            const prevYear = parseInt(prev.founded.match(/\d{4}/)?.[0] || '0');
            const currYear = parseInt(curr.founded.match(/\d{4}/)?.[0] || '0');
            return currYear > prevYear ? curr : prev;
        });
        return `🏛️ **THE NEWEST MONASTERY**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**${newest.name}**\n\n📅 **Founded:** ${newest.founded}\n📍 **Location:** ${newest.location}\n📿 **Buddhist Sect:** ${newest.sect}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📜 **ABOUT:**\n\n${newest.history}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔗 [Read more on Wikipedia](${newest.wiki})`;
    }

    // Largest monastery
    if (/\b(largest|biggest|main)\b/i.test(lowerMessage)) {
        const rumtek = findMonasteryByName('Rumtek');
        if (rumtek) {
            return `🏛️ **THE LARGEST MONASTERY IN SIKKIM**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**${rumtek.name}**\nAlso known as: **Dharma Chakra Centre**\n\n📅 **Founded:** ${rumtek.founded}\n📍 **Location:** ${rumtek.location}\n📿 **Buddhist Sect:** ${rumtek.sect}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📜 **HISTORICAL SIGNIFICANCE:**\n\n${rumtek.history}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✨ **KEY FEATURES:**\n\n• Largest monastery complex in Sikkim\n• Seat of the Karmapa Lama\n• Houses precious religious artifacts\n• Major center for Kagyu Buddhism\n• Stunning Tibetan architecture\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔗 [Read more on Wikipedia](${rumtek.wiki})`;
        }
    }

    // Holiest monastery
    if (/\b(holiest|sacred|holy)\b/i.test(lowerMessage)) {
        const tashiding = findMonasteryByName('Tashiding');
        if (tashiding) {
            return `✨ **THE HOLIEST MONASTERY IN SIKKIM**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**${tashiding.name}**\n\n📅 **Founded:** ${tashiding.founded}\n📍 **Location:** ${tashiding.location}\n📿 **Buddhist Sect:** ${tashiding.sect}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📜 **SPIRITUAL SIGNIFICANCE:**\n\n${tashiding.history}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🙏 **SACRED FEATURES:**\n\n• Considered the holiest site in Sikkim\n• Home to the famous Bumchu Festival\n• Blessed by Guru Padmasambhava\n• Sacred pilgrimage destination\n• Stunning hilltop location\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔗 [Read more on Wikipedia](${tashiding.wiki})`;
        }
    }

    // Specific monastery name search
    const monasteryNames = [
        'rumtek', 'pemayangtse', 'tashiding', 'phodong', 'enchey',
        'ralong', 'lachung', 'lachen', 'dubdi', 'yuksom', 'kartok',
        'zong dog palri', 'sanga choeling', 'lingdum', 'ranka',
        'bongtang', 'phensang'
    ];

    const foundName = monasteryNames.find(name => lowerMessage.includes(name));
    if (foundName) {
        const monastery = findMonasteryByName(foundName);
        if (monastery) {
            return `🏛️ **${monastery.name.toUpperCase()}**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📋 **BASIC INFORMATION:**\n\n📍 Location: ${monastery.location}\n📿 Buddhist Sect: ${monastery.sect}\n📅 Founded: ${monastery.founded}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📜 **HISTORICAL BACKGROUND:**\n\n${monastery.history}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔗 [Read detailed article on Wikipedia](${monastery.wiki})\n\n💡 Ask me for more details: \"When was it founded?\" or \"Tell me more about its history\"!`;
        }
    }

    // When/founded queries for specific monastery
    if (/\b(when|founded|built|established)\b/i.test(lowerMessage)) {
        const foundName = monasteryNames.find(name => lowerMessage.includes(name));
        if (foundName) {
            const monastery = findMonasteryByName(foundName);
            if (monastery) {
                return `**${monastery.name}** was founded in **${monastery.founded}**.\n\n📜 ${monastery.history}`;
            }
        }
        return "Please specify which monastery you'd like to know about. For example: \"When was Rumtek founded?\"";
    }

    // History queries
    if (/\b(history|story|about|tell me)\b/i.test(lowerMessage)) {
        const foundName = monasteryNames.find(name => lowerMessage.includes(name));
        if (foundName) {
            const monastery = findMonasteryByName(foundName);
            if (monastery) {
                return `**${monastery.name}**\n\n📍 **Location**: ${monastery.location}\n🏛️ **Sect**: ${monastery.sect}\n📅 **Founded**: ${monastery.founded}\n📜 **History**: ${monastery.history}\n\n[Read more on Wikipedia](${monastery.wiki})`;
            }
        }
    }

    // Count queries
    if (/\b(how many|number of|count)\b/i.test(lowerMessage)) {
        const nyingmaCount = getMonasteriesBySect('Nyingma').length;
        const kagyuCount = getMonasteriesBySect('Kagyu').length;
        return `📊 **MONASTERY STATISTICS**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Total Monasteries in Database:** ${monasteries.length}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📿 **BREAKDOWN BY SECT:**\n\n🔹 Nyingma Sect: ${nyingmaCount} monasteries (${Math.round(nyingmaCount/monasteries.length*100)}%)\n🔹 Kagyu Sect: ${kagyuCount} monasteries (${Math.round(kagyuCount/monasteries.length*100)}%)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📍 **DISTRIBUTION BY REGION:**\n\n• East Sikkim: Multiple monasteries\n• West Sikkim: Multiple monasteries\n• North Sikkim: Multiple monasteries\n• South Sikkim: Multiple monasteries\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 Commands:\n   • \"List all monasteries\" - See complete list\n   • \"Show Nyingma monasteries\" - Filter by sect\n   • \"Monasteries in Gangtok\" - Filter by location`;
    }

    // Default fallback
    return `❓ **I'M NOT SURE ABOUT THAT**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📚 In **Offline Mode**, I can help you with:\n\n🔍 **SPECIFIC MONASTERIES:**\n   • \"Tell me about Rumtek Monastery\"\n   • \"History of Pemayangtse\"\n   • \"Where is Enchey?\"\n\n📊 **CATEGORY SEARCHES:**\n   • \"Show Nyingma monasteries\"\n   • \"Monasteries in Gangtok\"\n   • \"List all monasteries\"\n\n❓ **SPECIAL QUERIES:**\n   • \"What's the oldest monastery?\"\n   • \"Which is the largest?\"\n   • \"How many monasteries?\"\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 **TIPS:**\n\n• Type \"help\" for complete guide\n• Switch to **Online Mode** 🤖 for AI-powered responses\n• Try asking your question differently\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
};
