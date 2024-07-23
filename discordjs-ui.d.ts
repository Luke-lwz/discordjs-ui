// -- Usage definitions --

// exporat all types in project
// export * from "./types";
// export * from "./utils/buttonCache";
// export * from "./utils/navigation";

// -- Driver definitions --



// -- Entry point definition --

/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as discordjs from "discord.js"
export interface UIOptions {
    client: any
    slashCommands?: SlashCommands[]
    slashCommandRegisterFunction?: (slashCommands: SlashCommands[]) => void
    prefix?: string
    routeDirectory?: string
    customRoutes?: CustomRoutes[]
    useFunctionalButtons?: boolean
    functionalButtonTtl?: number
    globalMetadata?: any
    messageDefault?: UIMessageOptional
}
declare function createUI(options: UIOptions): {
    openUI: (interaction: any, pathname: string) => Promise<void>
    onInteraction: (interaction: any) => void
}
declare const output: {
    ButtonBuilder: typeof ButtonBuilder
    render: typeof render
    deferRender: typeof deferRender
    createUI: typeof createUI
    createRegisterSlashCommandsFunction: typeof createRegisterSlashCommandsFunction
    basename(path: string, ext?: string): string
    cleanContent(str: string, channel: discordjs.TextBasedChannel): string
    discordSort<Key, Value extends {
        rawPosition: number
        id: string
    }>(collection: discordjs.ReadonlyCollection<Key, Value>): discordjs.Collection<Key, Value>
    cleanCodeBlockContent(text: string): string
    fetchRecommendedShardCount(token: string, options?: discordjs.FetchRecommendedShardCountOptions): Promise<number>
    flatten(obj: unknown, ...props: Record<string, string | boolean>[]): unknown
    makeError(obj: discordjs.MakeErrorOptions): Error
    makePlainError(err: Error): discordjs.MakeErrorOptions
    moveElementInArray(array: unknown[], element: unknown, newIndex: number, offset?: boolean): number
    parseEmoji(text: string): discordjs.PartialEmoji
    resolveColor(color: discordjs.ColorResolvable): number
    resolvePartialEmoji(emoji: string): discordjs.PartialEmojiOnlyId
    resolvePartialEmoji(emoji: discordjs.Emoji | discordjs.EmojiIdentifierResolvable): discordjs.PartialEmoji
    verifyString(data: string, error?: ErrorConstructor, errorMessage?: string, allowEmpty?: boolean): string
    setPosition<Item extends discordjs.Channel | discordjs.Role>(item: Item, position: number, relative: boolean, sorted: discordjs.ReadonlyCollection<string, Item>, client: discordjs.Client<true>, route: string, reason?: string): Promise<{
        id: string
        position: number
    }[]>
    parseWebhookURL(url: string): discordjs.WebhookClientDataIdWithToken
    transformResolved<Cached extends discordjs.CacheType>(supportingData: discordjs.SupportingInteractionResolvedData, data?: discordjs.APIInteractionDataResolved | discordjs.APIUserInteractionDataResolved | discordjs.APIMessageApplicationCommandInteractionDataResolved): discordjs.CommandInteractionResolvedData<Cached>
    resolveSKUId(resolvable: discordjs.SKUResolvable): string
    createChannel(client: discordjs.Client<true>, data: discordjs.APIChannel, guild?: discordjs.Guild, extras?: discordjs.CreateChannelOptions): discordjs.Channel
    createComponent<Type extends keyof discordjs.MappedComponentTypes>(data: discordjs.APIMessageComponent & {
        type: Type
    }): discordjs.MappedComponentTypes[Type]
    createComponent<Data extends discordjs.Component<discordjs.AnyComponent>>(data: Data): Data
    createComponent(data: discordjs.APIMessageComponent | discordjs.Component<discordjs.AnyComponent>): discordjs.Component<discordjs.AnyComponent>
    createComponentBuilder<Type_1 extends keyof discordjs.MappedComponentBuilderTypes>(data: discordjs.APIMessageComponent & {
        type: Type_1
    }): discordjs.MappedComponentBuilderTypes[Type_1]
    createComponentBuilder<Data_1 extends discordjs.ComponentBuilder<discordjs.APIBaseComponent<discordjs.ComponentType>>>(data: Data_1): Data_1
    createComponentBuilder(data: discordjs.APIMessageComponent | discordjs.ComponentBuilder<discordjs.APIBaseComponent<discordjs.ComponentType>>): discordjs.ComponentBuilder<discordjs.APIBaseComponent<discordjs.ComponentType>>
    resolveBase64(data: discordjs.Base64Resolvable): string
    resolveCode(data: string, regex: RegExp): string
    resolveFile(resource: import("stream").Stream | discordjs.BufferResolvable): Promise<discordjs.ResolvedFile>
    resolveImage(resource: string | Buffer): Promise<string>
    resolveInviteCode(data: string): string
    resolveGuildTemplateCode(data: string): string
    Activity: typeof discordjs.Activity
    ActionRowBuilder: typeof discordjs.ActionRowBuilder
    ActionRow: typeof discordjs.ActionRow
    ActivityFlagsBitField: typeof discordjs.ActivityFlagsBitField
    AnonymousGuild: typeof discordjs.AnonymousGuild
    AutoModerationActionExecution: typeof discordjs.AutoModerationActionExecution
    AutoModerationRule: typeof discordjs.AutoModerationRule
    Application: typeof discordjs.Application
    ApplicationCommand: typeof discordjs.ApplicationCommand
    ApplicationRoleConnectionMetadata: typeof discordjs.ApplicationRoleConnectionMetadata
    ApplicationFlagsBitField: typeof discordjs.ApplicationFlagsBitField
    Base: typeof discordjs.Base
    BaseClient: typeof discordjs.BaseClient
    CommandInteraction: typeof discordjs.CommandInteraction
    InteractionResponse: typeof discordjs.InteractionResponse
    BaseGuild: typeof discordjs.BaseGuild
    BaseGuildEmoji: typeof discordjs.BaseGuildEmoji
    BaseGuildTextChannel: typeof discordjs.BaseGuildTextChannel
    BaseGuildVoiceChannel: typeof discordjs.BaseGuildVoiceChannel
    BitField: typeof discordjs.BitField
    ButtonInteraction: typeof discordjs.ButtonInteraction
    Component: typeof discordjs.Component
    ButtonComponent: typeof discordjs.ButtonComponent
    StringSelectMenuBuilder: typeof discordjs.StringSelectMenuBuilder
    SelectMenuBuilder: typeof discordjs.StringSelectMenuBuilder
    SelectMenuOptionBuilder: typeof discordjs.StringSelectMenuOptionBuilder
    UserSelectMenuBuilder: typeof discordjs.UserSelectMenuBuilder
    RoleSelectMenuBuilder: typeof discordjs.RoleSelectMenuBuilder
    MentionableSelectMenuBuilder: typeof discordjs.MentionableSelectMenuBuilder
    ChannelSelectMenuBuilder: typeof discordjs.ChannelSelectMenuBuilder
    StringSelectMenuOptionBuilder: typeof discordjs.StringSelectMenuOptionBuilder
    ModalBuilder: typeof discordjs.ModalBuilder
    TextInputBuilder: typeof discordjs.TextInputBuilder
    TextInputComponent: typeof discordjs.TextInputComponent
    BaseSelectMenuComponent: typeof discordjs.BaseSelectMenuComponent
    StringSelectMenuComponent: typeof discordjs.StringSelectMenuComponent
    SelectMenuComponent: typeof discordjs.StringSelectMenuComponent
    UserSelectMenuComponent: typeof discordjs.UserSelectMenuComponent
    RoleSelectMenuComponent: typeof discordjs.RoleSelectMenuComponent
    MentionableSelectMenuComponent: typeof discordjs.MentionableSelectMenuComponent
    ChannelSelectMenuComponent: typeof discordjs.ChannelSelectMenuComponent
    EmbedBuilder: typeof discordjs.EmbedBuilder
    Embed: typeof discordjs.Embed
    CategoryChannel: typeof discordjs.CategoryChannel
    ChannelFlagsBitField: typeof discordjs.ChannelFlagsBitField
    BaseChannel: typeof discordjs.BaseChannel
    Client: typeof discordjs.Client
    ClientApplication: typeof discordjs.ClientApplication
    ClientPresence: typeof discordjs.ClientPresence
    ClientUser: typeof discordjs.ClientUser
    Options: typeof discordjs.Options
    ClientVoiceManager: typeof discordjs.ClientVoiceManager
    Collection: typeof discordjs.Collection
    Collector: typeof discordjs.Collector
    ChatInputCommandInteraction: typeof discordjs.ChatInputCommandInteraction
    AutocompleteInteraction: typeof discordjs.AutocompleteInteraction
    CommandInteractionOptionResolver: typeof discordjs.CommandInteractionOptionResolver
    ContextMenuCommandInteraction: typeof discordjs.ContextMenuCommandInteraction
    DMChannel: typeof discordjs.DMChannel
    Emoji: typeof discordjs.Emoji
    Entitlement: typeof discordjs.Entitlement
    Guild: typeof discordjs.Guild
    GuildAuditLogs: typeof discordjs.GuildAuditLogs
    GuildAuditLogsEntry: typeof discordjs.GuildAuditLogsEntry
    GuildBan: typeof discordjs.GuildBan
    GuildChannel: typeof discordjs.GuildChannel
    GuildEmoji: typeof discordjs.GuildEmoji
    GuildMemberFlagsBitField: typeof discordjs.GuildMemberFlagsBitField
    GuildMember: typeof discordjs.GuildMember
    GuildOnboarding: typeof discordjs.GuildOnboarding
    GuildOnboardingPrompt: typeof discordjs.GuildOnboardingPrompt
    GuildOnboardingPromptOption: typeof discordjs.GuildOnboardingPromptOption
    GuildPreview: typeof discordjs.GuildPreview
    GuildScheduledEvent: typeof discordjs.GuildScheduledEvent
    GuildTemplate: typeof discordjs.GuildTemplate
    GuildPreviewEmoji: typeof discordjs.GuildPreviewEmoji
    Integration: typeof discordjs.Integration
    IntegrationApplication: typeof discordjs.IntegrationApplication
    IntentsBitField: typeof discordjs.IntentsBitField
    BaseInteraction: typeof discordjs.BaseInteraction
    InteractionCollector: typeof discordjs.InteractionCollector
    InteractionWebhook: typeof discordjs.InteractionWebhook
    Invite: typeof discordjs.Invite
    InviteStageInstance: typeof discordjs.InviteStageInstance
    InviteGuild: typeof discordjs.InviteGuild
    LimitedCollection: typeof discordjs.LimitedCollection
    Message: typeof discordjs.Message
    AttachmentBuilder: typeof discordjs.AttachmentBuilder
    Attachment: typeof discordjs.Attachment
    AttachmentFlagsBitField: typeof discordjs.AttachmentFlagsBitField
    MessageCollector: typeof discordjs.MessageCollector
    MessageComponentInteraction: typeof discordjs.MessageComponentInteraction
    MessageContextMenuCommandInteraction: typeof discordjs.MessageContextMenuCommandInteraction
    MessageFlagsBitField: typeof discordjs.MessageFlagsBitField
    MessageMentions: typeof discordjs.MessageMentions
    MessagePayload: typeof discordjs.MessagePayload
    MessageReaction: typeof discordjs.MessageReaction
    ModalSubmitFields: typeof discordjs.ModalSubmitFields
    ModalSubmitInteraction: typeof discordjs.ModalSubmitInteraction
    NewsChannel: typeof discordjs.NewsChannel
    OAuth2Guild: typeof discordjs.OAuth2Guild
    PartialGroupDMChannel: typeof discordjs.PartialGroupDMChannel
    ThreadOnlyChannel: typeof discordjs.ThreadOnlyChannel
    ForumChannel: typeof discordjs.ForumChannel
    MediaChannel: typeof discordjs.MediaChannel
    PermissionOverwrites: typeof discordjs.PermissionOverwrites
    PermissionsBitField: typeof discordjs.PermissionsBitField
    Presence: typeof discordjs.Presence
    Poll: typeof discordjs.Poll
    PollAnswer: typeof discordjs.PollAnswer
    ReactionCollector: typeof discordjs.ReactionCollector
    ReactionEmoji: typeof discordjs.ReactionEmoji
    RichPresenceAssets: typeof discordjs.RichPresenceAssets
    Role: typeof discordjs.Role
    RoleFlagsBitField: typeof discordjs.RoleFlagsBitField
    StringSelectMenuInteraction: typeof discordjs.StringSelectMenuInteraction
    SelectMenuInteraction: typeof discordjs.StringSelectMenuInteraction
    UserSelectMenuInteraction: typeof discordjs.UserSelectMenuInteraction
    RoleSelectMenuInteraction: typeof discordjs.RoleSelectMenuInteraction
    MentionableSelectMenuInteraction: typeof discordjs.MentionableSelectMenuInteraction
    ChannelSelectMenuInteraction: typeof discordjs.ChannelSelectMenuInteraction
    Shard: typeof discordjs.Shard
    ShardClientUtil: typeof discordjs.ShardClientUtil
    ShardingManager: typeof discordjs.ShardingManager
    SnowflakeUtil: import("@sapphire/snowflake").Snowflake
    SKU: typeof discordjs.SKU
    SKUFlagsBitField: typeof discordjs.SKUFlagsBitField
    StageChannel: typeof discordjs.StageChannel
    DirectoryChannel: typeof discordjs.DirectoryChannel
    StageInstance: typeof discordjs.StageInstance
    Sticker: typeof discordjs.Sticker
    StickerPack: typeof discordjs.StickerPack
    Sweepers: typeof discordjs.Sweepers
    SystemChannelFlagsBitField: typeof discordjs.SystemChannelFlagsBitField
    Team: typeof discordjs.Team
    TeamMember: typeof discordjs.TeamMember
    TextChannel: typeof discordjs.TextChannel
    ThreadChannel: typeof discordjs.ThreadChannel
    ThreadMember: typeof discordjs.ThreadMember
    ThreadMemberFlagsBitField: typeof discordjs.ThreadMemberFlagsBitField
    Typing: typeof discordjs.Typing
    User: typeof discordjs.User
    UserContextMenuCommandInteraction: typeof discordjs.UserContextMenuCommandInteraction
    UserFlagsBitField: typeof discordjs.UserFlagsBitField
    Formatters: typeof discordjs.Formatters
    VoiceChannel: typeof discordjs.VoiceChannel
    VoiceRegion: typeof discordjs.VoiceRegion
    VoiceState: typeof discordjs.VoiceState
    Webhook: typeof discordjs.Webhook
    WebhookClient: typeof discordjs.WebhookClient
    WebSocketManager: typeof discordjs.WebSocketManager
    WebSocketShard: typeof discordjs.WebSocketShard
    Widget: typeof discordjs.Widget
    WidgetMember: typeof discordjs.WidgetMember
    WelcomeChannel: typeof discordjs.WelcomeChannel
    WelcomeScreen: typeof discordjs.WelcomeScreen
    Constants: {
        MaxBulkDeletableMessageAge: 1209600000
        SweeperKeys: (keyof discordjs.SweeperDefinitions)[]
        NonSystemMessageTypes: discordjs.NonSystemMessageType[]
        TextBasedChannelTypes: (discordjs.ChannelType.GuildText | discordjs.ChannelType.DM | discordjs.ChannelType.GuildVoice | discordjs.ChannelType.GuildAnnouncement | discordjs.ChannelType.AnnouncementThread | discordjs.ChannelType.PublicThread | discordjs.ChannelType.PrivateThread | discordjs.ChannelType.GuildStageVoice)[]
        GuildTextBasedChannelTypes: discordjs.GuildTextBasedChannelTypes[]
        ThreadChannelTypes: discordjs.ThreadChannelType[]
        VoiceBasedChannelTypes: (discordjs.ChannelType.GuildVoice | discordjs.ChannelType.GuildStageVoice)[]
        SelectMenuTypes: (discordjs.ComponentType.StringSelect | discordjs.ComponentType.UserSelect | discordjs.ComponentType.RoleSelect | discordjs.ComponentType.MentionableSelect | discordjs.ComponentType.ChannelSelect)[]
        UndeletableMessageTypes: discordjs.UndeletableMessageType[]
        DeletableMessageTypes: discordjs.DeletableMessageType[]
        StickerFormatExtensionMap: Record<discordjs.StickerFormatType, discordjs.ImageFormat>
    }
    version: string
    DiscordjsErrorCodes: typeof discordjs.DiscordjsErrorCodes
    DiscordjsError: typeof discordjs.DiscordjsError
    DiscordjsTypeError: typeof discordjs.DiscordjsTypeError
    DiscordjsRangeError: typeof discordjs.DiscordjsRangeError
    BaseManager: typeof discordjs.BaseManager
    DataManager: typeof discordjs.DataManager
    CachedManager: typeof discordjs.CachedManager
    ApplicationCommandManager: typeof discordjs.ApplicationCommandManager
    ApplicationCommandPermissionsManager: typeof discordjs.ApplicationCommandPermissionsManager
    AutoModerationRuleManager: typeof discordjs.AutoModerationRuleManager
    BaseGuildEmojiManager: typeof discordjs.BaseGuildEmojiManager
    CategoryChannelChildManager: typeof discordjs.CategoryChannelChildManager
    ChannelManager: typeof discordjs.ChannelManager
    EntitlementManager: typeof discordjs.EntitlementManager
    GuildApplicationCommandManager: typeof discordjs.GuildApplicationCommandManager
    GuildChannelManager: typeof discordjs.GuildChannelManager
    GuildEmojiManager: typeof discordjs.GuildEmojiManager
    GuildEmojiRoleManager: typeof discordjs.GuildEmojiRoleManager
    GuildManager: typeof discordjs.GuildManager
    GuildMemberManager: typeof discordjs.GuildMemberManager
    GuildBanManager: typeof discordjs.GuildBanManager
    GuildInviteManager: typeof discordjs.GuildInviteManager
    GuildScheduledEventManager: typeof discordjs.GuildScheduledEventManager
    GuildStickerManager: typeof discordjs.GuildStickerManager
    GuildMemberRoleManager: typeof discordjs.GuildMemberRoleManager
    MessageManager: typeof discordjs.MessageManager
    DMMessageManager: typeof discordjs.DMMessageManager
    GuildMessageManager: typeof discordjs.GuildMessageManager
    PermissionOverwriteManager: typeof discordjs.PermissionOverwriteManager
    PresenceManager: typeof discordjs.PresenceManager
    ReactionManager: typeof discordjs.ReactionManager
    ReactionUserManager: typeof discordjs.ReactionUserManager
    RoleManager: typeof discordjs.RoleManager
    StageInstanceManager: typeof discordjs.StageInstanceManager
    ThreadManager: typeof discordjs.ThreadManager
    GuildTextThreadManager: typeof discordjs.GuildTextThreadManager
    GuildForumThreadManager: typeof discordjs.GuildForumThreadManager
    ThreadMemberManager: typeof discordjs.ThreadMemberManager
    UserManager: typeof discordjs.UserManager
    VoiceStateManager: typeof discordjs.VoiceStateManager
    Colors: {
        Default: 0
        White: 16777215
        Aqua: 1752220
        Green: 5763719
        Blue: 3447003
        Yellow: 16705372
        Purple: 10181046
        LuminousVividPink: 15277667
        Fuchsia: 15418782
        Gold: 15844367
        Orange: 15105570
        Red: 15548997
        Grey: 9807270
        Navy: 3426654
        DarkAqua: 1146986
        DarkGreen: 2067276
        DarkBlue: 2123412
        DarkPurple: 7419530
        DarkVividPink: 11342935
        DarkGold: 12745742
        DarkOrange: 11027200
        DarkRed: 10038562
        DarkGrey: 9936031
        DarkerGrey: 8359053
        LightGrey: 12370112
        DarkNavy: 2899536
        Blurple: 5793266
        Greyple: 10070709
        DarkButNotBlack: 2895667
        NotQuiteBlack: 2303786
    }
    Events: typeof discordjs.Events
    ShardEvents: typeof discordjs.ShardEvents
    WebSocketShardEvents: typeof discordjs.WebSocketShardEvents
    Status: typeof discordjs.Status
    Partials: typeof discordjs.Partials
    Utils: typeof discordjs.Utils
    GatewayVersion: "10"
    GatewayOpcodes: typeof discordjs.GatewayOpcodes
    GatewayCloseCodes: typeof discordjs.GatewayCloseCodes
    GatewayIntentBits: typeof discordjs.GatewayIntentBits
    GatewayDispatchEvents: typeof discordjs.GatewayDispatchEvents
    FormattingPatterns: {
        readonly User: RegExp
        readonly UserWithNickname: RegExp
        readonly UserWithOptionalNickname: RegExp
        readonly Channel: RegExp
        readonly Role: RegExp
        readonly SlashCommand: RegExp
        readonly Emoji: RegExp
        readonly AnimatedEmoji: RegExp
        readonly StaticEmoji: RegExp
        readonly Timestamp: RegExp
        readonly DefaultStyledTimestamp: RegExp
        readonly StyledTimestamp: RegExp
    }
    PermissionFlagsBits: {
        readonly CreateInstantInvite: bigint
        readonly KickMembers: bigint
        readonly BanMembers: bigint
        readonly Administrator: bigint
        readonly ManageChannels: bigint
        readonly ManageGuild: bigint
        readonly AddReactions: bigint
        readonly ViewAuditLog: bigint
        readonly PrioritySpeaker: bigint
        readonly Stream: bigint
        readonly ViewChannel: bigint
        readonly SendMessages: bigint
        readonly SendTTSMessages: bigint
        readonly ManageMessages: bigint
        readonly EmbedLinks: bigint
        readonly AttachFiles: bigint
        readonly ReadMessageHistory: bigint
        readonly MentionEveryone: bigint
        readonly UseExternalEmojis: bigint
        readonly ViewGuildInsights: bigint
        readonly Connect: bigint
        readonly Speak: bigint
        readonly MuteMembers: bigint
        readonly DeafenMembers: bigint
        readonly MoveMembers: bigint
        readonly UseVAD: bigint
        readonly ChangeNickname: bigint
        readonly ManageNicknames: bigint
        readonly ManageRoles: bigint
        readonly ManageWebhooks: bigint
        readonly ManageEmojisAndStickers: bigint
        readonly ManageGuildExpressions: bigint
        readonly UseApplicationCommands: bigint
        readonly RequestToSpeak: bigint
        readonly ManageEvents: bigint
        readonly ManageThreads: bigint
        readonly CreatePublicThreads: bigint
        readonly CreatePrivateThreads: bigint
        readonly UseExternalStickers: bigint
        readonly SendMessagesInThreads: bigint
        readonly UseEmbeddedActivities: bigint
        readonly ModerateMembers: bigint
        readonly ViewCreatorMonetizationAnalytics: bigint
        readonly UseSoundboard: bigint
        readonly CreateGuildExpressions: bigint
        readonly CreateEvents: bigint
        readonly UseExternalSounds: bigint
        readonly SendVoiceMessages: bigint
        readonly SendPolls: bigint
    }
    ApplicationFlags: typeof discordjs.ApplicationFlags
    ApplicationRoleConnectionMetadataType: typeof discordjs.ApplicationRoleConnectionMetadataType
    AuditLogEvent: typeof discordjs.AuditLogEvent
    AuditLogOptionsType: typeof discordjs.AuditLogOptionsType
    AutoModerationRuleTriggerType: typeof discordjs.AutoModerationRuleTriggerType
    AutoModerationRuleKeywordPresetType: typeof discordjs.AutoModerationRuleKeywordPresetType
    AutoModerationRuleEventType: typeof discordjs.AutoModerationRuleEventType
    AutoModerationActionType: typeof discordjs.AutoModerationActionType
    SortOrderType: typeof discordjs.SortOrderType
    ForumLayoutType: typeof discordjs.ForumLayoutType
    ChannelType: typeof discordjs.ChannelType
    VideoQualityMode: typeof discordjs.VideoQualityMode
    MessageType: typeof discordjs.MessageType
    MessageActivityType: typeof discordjs.MessageActivityType
    MessageFlags: typeof discordjs.MessageFlags
    OverwriteType: typeof discordjs.OverwriteType
    ThreadAutoArchiveDuration: typeof discordjs.ThreadAutoArchiveDuration
    ThreadMemberFlags: typeof discordjs.ThreadMemberFlags
    EmbedType: typeof discordjs.EmbedType
    AttachmentFlags: typeof discordjs.AttachmentFlags
    AllowedMentionsTypes: typeof discordjs.AllowedMentionsTypes
    ComponentType: typeof discordjs.ComponentType
    ButtonStyle: typeof discordjs.ButtonStyle
    TextInputStyle: typeof discordjs.TextInputStyle
    SelectMenuDefaultValueType: typeof discordjs.SelectMenuDefaultValueType
    ChannelFlags: typeof discordjs.ChannelFlags
    PresenceUpdateStatus: typeof discordjs.PresenceUpdateStatus
    ActivityPlatform: typeof discordjs.ActivityPlatform
    ActivityType: typeof discordjs.ActivityType
    ActivityFlags: typeof discordjs.ActivityFlags
    GuildDefaultMessageNotifications: typeof discordjs.GuildDefaultMessageNotifications
    GuildExplicitContentFilter: typeof discordjs.GuildExplicitContentFilter
    GuildMFALevel: typeof discordjs.GuildMFALevel
    GuildNSFWLevel: typeof discordjs.GuildNSFWLevel
    GuildVerificationLevel: typeof discordjs.GuildVerificationLevel
    GuildPremiumTier: typeof discordjs.GuildPremiumTier
    GuildHubType: typeof discordjs.GuildHubType
    GuildSystemChannelFlags: typeof discordjs.GuildSystemChannelFlags
    GuildFeature: typeof discordjs.GuildFeature
    GuildMemberFlags: typeof discordjs.GuildMemberFlags
    IntegrationExpireBehavior: typeof discordjs.IntegrationExpireBehavior
    GuildWidgetStyle: typeof discordjs.GuildWidgetStyle
    MembershipScreeningFieldType: typeof discordjs.MembershipScreeningFieldType
    GuildOnboardingMode: typeof discordjs.GuildOnboardingMode
    GuildOnboardingPromptType: typeof discordjs.GuildOnboardingPromptType
    GuildScheduledEventEntityType: typeof discordjs.GuildScheduledEventEntityType
    GuildScheduledEventStatus: typeof discordjs.GuildScheduledEventStatus
    GuildScheduledEventPrivacyLevel: typeof discordjs.GuildScheduledEventPrivacyLevel
    ApplicationCommandType: typeof discordjs.ApplicationCommandType
    ApplicationCommandOptionType: typeof discordjs.ApplicationCommandOptionType
    ApplicationCommandPermissionType: typeof discordjs.ApplicationCommandPermissionType
    APIApplicationCommandPermissionsConstant: {
        Everyone: (guildId: string | bigint) => string
        AllChannels: (guildId: string | bigint) => string
    }
    InteractionType: typeof discordjs.InteractionType
    InteractionResponseType: typeof discordjs.InteractionResponseType
    InviteType: typeof discordjs.InviteType
    InviteTargetType: typeof discordjs.InviteTargetType
    OAuth2Scopes: typeof discordjs.OAuth2Scopes
    PollLayoutType: typeof discordjs.PollLayoutType
    RoleFlags: typeof discordjs.RoleFlags
    StageInstancePrivacyLevel: typeof discordjs.StageInstancePrivacyLevel
    StickerType: typeof discordjs.StickerType
    StickerFormatType: typeof discordjs.StickerFormatType
    TeamMemberMembershipState: typeof discordjs.TeamMemberMembershipState
    TeamMemberRole: typeof discordjs.TeamMemberRole
    UserFlags: typeof discordjs.UserFlags
    UserPremiumType: typeof discordjs.UserPremiumType
    ConnectionService: typeof discordjs.ConnectionService
    ConnectionVisibility: typeof discordjs.ConnectionVisibility
    WebhookType: typeof discordjs.WebhookType
    EntitlementType: typeof discordjs.EntitlementType
    SKUFlags: typeof discordjs.SKUFlags
    SKUType: typeof discordjs.SKUType
    APIVersion: "10"
    Routes: {
        applicationRoleConnectionMetadata(applicationId: string): `/applications/${string}/role-connections/metadata`
        guildAutoModerationRules(guildId: string): `/guilds/${string}/auto-moderation/rules`
        guildAutoModerationRule(guildId: string, ruleId: string): `/guilds/${string}/auto-moderation/rules/${string}`
        guildAuditLog(guildId: string): `/guilds/${string}/audit-logs`
        channel(channelId: string): `/channels/${string}`
        channelMessages(channelId: string): `/channels/${string}/messages`
        channelMessage(channelId: string, messageId: string): `/channels/${string}/messages/${string}`
        channelMessageCrosspost(channelId: string, messageId: string): `/channels/${string}/messages/${string}/crosspost`
        channelMessageOwnReaction(channelId: string, messageId: string, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}/@me`
        channelMessageUserReaction(channelId: string, messageId: string, emoji: string, userId: string): `/channels/${string}/messages/${string}/reactions/${string}/${string}`
        channelMessageReaction(channelId: string, messageId: string, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}`
        channelMessageAllReactions(channelId: string, messageId: string): `/channels/${string}/messages/${string}/reactions`
        channelBulkDelete(channelId: string): `/channels/${string}/messages/bulk-delete`
        channelPermission(channelId: string, overwriteId: string): `/channels/${string}/permissions/${string}`
        channelInvites(channelId: string): `/channels/${string}/invites`
        channelFollowers(channelId: string): `/channels/${string}/followers`
        channelTyping(channelId: string): `/channels/${string}/typing`
        channelPins(channelId: string): `/channels/${string}/pins`
        channelPin(channelId: string, messageId: string): `/channels/${string}/pins/${string}`
        channelRecipient(channelId: string, userId: string): `/channels/${string}/recipients/${string}`
        guildEmojis(guildId: string): `/guilds/${string}/emojis`
        guildEmoji(guildId: string, emojiId: string): `/guilds/${string}/emojis/${string}`
        guilds(): "/guilds"
        guild(guildId: string): `/guilds/${string}`
        guildPreview(guildId: string): `/guilds/${string}/preview`
        guildChannels(guildId: string): `/guilds/${string}/channels`
        guildMember(guildId: string, userId?: string): `/guilds/${string}/members/${string}`
        guildMembers(guildId: string): `/guilds/${string}/members`
        guildMembersSearch(guildId: string): `/guilds/${string}/members/search`
        guildCurrentMemberNickname(guildId: string): `/guilds/${string}/members/@me/nick`
        guildMemberRole(guildId: string, memberId: string, roleId: string): `/guilds/${string}/members/${string}/roles/${string}`
        guildMFA(guildId: string): `/guilds/${string}/mfa`
        guildBans(guildId: string): `/guilds/${string}/bans`
        guildBan(guildId: string, userId: string): `/guilds/${string}/bans/${string}`
        guildRoles(guildId: string): `/guilds/${string}/roles`
        guildRole(guildId: string, roleId: string): `/guilds/${string}/roles/${string}`
        guildPrune(guildId: string): `/guilds/${string}/prune`
        guildVoiceRegions(guildId: string): `/guilds/${string}/regions`
        guildInvites(guildId: string): `/guilds/${string}/invites`
        guildIntegrations(guildId: string): `/guilds/${string}/integrations`
        guildIntegration(guildId: string, integrationId: string): `/guilds/${string}/integrations/${string}`
        guildWidgetSettings(guildId: string): `/guilds/${string}/widget`
        guildWidgetJSON(guildId: string): `/guilds/${string}/widget.json`
        guildVanityUrl(guildId: string): `/guilds/${string}/vanity-url`
        guildWidgetImage(guildId: string): `/guilds/${string}/widget.png`
        invite(code: string): `/invites/${string}`
        template(code: string): `/guilds/templates/${string}`
        guildTemplates(guildId: string): `/guilds/${string}/templates`
        guildTemplate(guildId: string, code: string): `/guilds/${string}/templates/${string}`
        pollAnswerVoters(channelId: string, messageId: string, answerId: number): `/channels/${string}/polls/${string}/answers/${number}`
        expirePoll(channelId: string, messageId: string): `/channels/${string}/polls/${string}/expire`
        threads(parentId: string, messageId?: string): `/channels/${string}/messages/${string}/threads` | `/channels/${string}/threads`
        guildActiveThreads(guildId: string): `/guilds/${string}/threads/active`
        channelThreads(channelId: string, archivedStatus: "private" | "public"): `/channels/${string}/threads/archived/private` | `/channels/${string}/threads/archived/public`
        channelJoinedArchivedThreads(channelId: string): `/channels/${string}/users/@me/threads/archived/private`
        threadMembers(threadId: string, userId?: string): `/channels/${string}/thread-members/${string}` | `/channels/${string}/thread-members`
        user(userId?: string): `/users/${string}`
        userApplicationRoleConnection(applicationId: string): `/users/@me/applications/${string}/role-connection`
        userGuilds(): "/users/@me/guilds"
        userGuildMember(guildId: string): `/users/@me/guilds/${string}/member`
        userGuild(guildId: string): `/users/@me/guilds/${string}`
        userChannels(): "/users/@me/channels"
        userConnections(): "/users/@me/connections"
        voiceRegions(): "/voice/regions"
        channelWebhooks(channelId: string): `/channels/${string}/webhooks`
        guildWebhooks(guildId: string): `/guilds/${string}/webhooks`
        webhook(webhookId: string, webhookToken?: string): `/webhooks/${string}/${string}` | `/webhooks/${string}`
        webhookMessage(webhookId: string, webhookToken: string, messageId?: string): `/webhooks/${string}/${string}/messages/${string}`
        webhookPlatform(webhookId: string, webhookToken: string, platform: "github" | "slack"): `/webhooks/${string}/${string}/github` | `/webhooks/${string}/${string}/slack`
        gateway(): "/gateway"
        gatewayBot(): "/gateway/bot"
        oauth2CurrentApplication(): "/oauth2/applications/@me"
        oauth2CurrentAuthorization(): "/oauth2/@me"
        oauth2Authorization(): "/oauth2/authorize"
        oauth2TokenExchange(): "/oauth2/token"
        oauth2TokenRevocation(): "/oauth2/token/revoke"
        applicationCommands(applicationId: string): `/applications/${string}/commands`
        applicationCommand(applicationId: string, commandId: string): `/applications/${string}/commands/${string}`
        applicationGuildCommands(applicationId: string, guildId: string): `/applications/${string}/guilds/${string}/commands`
        applicationGuildCommand(applicationId: string, guildId: string, commandId: string): `/applications/${string}/guilds/${string}/commands/${string}`
        interactionCallback(interactionId: string, interactionToken: string): `/interactions/${string}/${string}/callback`
        guildMemberVerification(guildId: string): `/guilds/${string}/member-verification`
        guildVoiceState(guildId: string, userId?: string): `/guilds/${string}/voice-states/${string}`
        guildApplicationCommandsPermissions(applicationId: string, guildId: string): `/applications/${string}/guilds/${string}/commands/permissions`
        applicationCommandPermissions(applicationId: string, guildId: string, commandId: string): `/applications/${string}/guilds/${string}/commands/${string}/permissions`
        guildWelcomeScreen(guildId: string): `/guilds/${string}/welcome-screen`
        stageInstances(): "/stage-instances"
        stageInstance(channelId: string): `/stage-instances/${string}`
        sticker(stickerId: string): `/stickers/${string}`
        stickerPacks(): "/sticker-packs"
        nitroStickerPacks(): "/sticker-packs"
        guildStickers(guildId: string): `/guilds/${string}/stickers`
        guildSticker(guildId: string, stickerId: string): `/guilds/${string}/stickers/${string}`
        guildScheduledEvents(guildId: string): `/guilds/${string}/scheduled-events`
        guildScheduledEvent(guildId: string, guildScheduledEventId: string): `/guilds/${string}/scheduled-events/${string}`
        guildScheduledEventUsers(guildId: string, guildScheduledEventId: string): `/guilds/${string}/scheduled-events/${string}/users`
        guildOnboarding(guildId: string): `/guilds/${string}/onboarding`
        currentApplication(): "/applications/@me"
        entitlements(applicationId: string): `/applications/${string}/entitlements`
        entitlement(applicationId: string, entitlementId: string): `/applications/${string}/entitlements/${string}`
        skus(applicationId: string): `/applications/${string}/skus`
        guildBulkBan(guildId: string): `/guilds/${string}/bulk-ban`
        consumeEntitlement(applicationId: string, entitlementId: string): `/applications/${string}/entitlements/${string}/consume`
    }
    StickerPackApplicationId: "710982414301790216"
    ImageFormat: typeof discordjs.ImageFormat
    CDNRoutes: {
        emoji<Format extends discordjs.EmojiFormat>(emojiId: string, format: Format): `/emojis/${string}.${Format}`
        guildIcon<Format_1 extends discordjs.GuildIconFormat>(guildId: string, guildIcon: string, format: Format_1): `icons/${string}/${string}.${Format_1}`
        guildSplash<Format_2 extends discordjs.GuildSplashFormat>(guildId: string, guildSplash: string, format: Format_2): `/splashes/${string}/${string}.${Format_2}`
        guildDiscoverySplash<Format_3 extends discordjs.GuildDiscoverySplashFormat>(guildId: string, guildDiscoverySplash: string, format: Format_3): `/discovery-splashes/${string}/${string}.${Format_3}`
        guildBanner<Format_4 extends discordjs.GuildBannerFormat>(guildId: string, guildBanner: string, format: Format_4): `/banners/${string}/${string}.${Format_4}`
        userBanner<Format_5 extends discordjs.UserBannerFormat>(userId: string, userBanner: string, format: Format_5): `/banners/${string}/${string}.${Format_5}`
        defaultUserAvatar<Index extends discordjs.DefaultUserAvatarAssets>(index: Index): `/embed/avatars/${Index}.png`
        userAvatar<Format_6 extends discordjs.UserAvatarFormat>(userId: string, userAvatar: string, format: Format_6): `/avatars/${string}/${string}.${Format_6}`
        guildMemberAvatar<Format_7 extends discordjs.GuildMemberAvatarFormat>(guildId: string, userId: string, memberAvatar: string, format: Format_7): `/guilds/${string}/users/${string}/avatars/${string}.${Format_7}`
        userAvatarDecoration(userId: string, userAvatarDecoration: string): `/avatar-decorations/${string}/${string}.png`
        applicationIcon<Format_8 extends discordjs.ApplicationIconFormat>(applicationId: string, applicationIcon: string, format: Format_8): `/app-icons/${string}/${string}.${Format_8}`
        applicationCover<Format_9 extends discordjs.ApplicationCoverFormat>(applicationId: string, applicationCoverImage: string, format: Format_9): `/app-icons/${string}/${string}.${Format_9}`
        applicationAsset<Format_10 extends discordjs.ApplicationAssetFormat>(applicationId: string, applicationAssetId: string, format: Format_10): `/app-assets/${string}/${string}.${Format_10}`
        achievementIcon<Format_11 extends discordjs.AchievementIconFormat>(applicationId: string, achievementId: string, achievementIconHash: string, format: Format_11): `/app-assets/${string}/achievements/${string}/icons/${string}.${Format_11}`
        stickerPackBanner<Format_12 extends discordjs.StickerPackBannerFormat>(stickerPackBannerAssetId: string, format: Format_12): `/app-assets/710982414301790216/store/${string}.${Format_12}`
        storePageAsset<Format_13 extends discordjs.StorePageAssetFormat = discordjs.ImageFormat.PNG>(applicationId: string, assetId: string, format?: Format_13): `/app-assets/${string}/store/${string}.${Format_13}`
        teamIcon<Format_14 extends discordjs.TeamIconFormat>(teamId: string, teamIcon: string, format: Format_14): `/team-icons/${string}/${string}.${Format_14}`
        sticker<Format_15 extends discordjs.StickerFormat>(stickerId: string, format: Format_15): `/stickers/${string}.${Format_15}`
        roleIcon<Format_16 extends discordjs.RoleIconFormat>(roleId: string, roleIcon: string, format: Format_16): `/role-icons/${string}/${string}.${Format_16}`
        guildScheduledEventCover<Format_17 extends discordjs.GuildScheduledEventCoverFormat>(guildScheduledEventId: string, guildScheduledEventCoverImage: string, format: Format_17): `/guild-events/${string}/${string}.${Format_17}`
        guildMemberBanner<Format_18 extends discordjs.GuildMemberBannerFormat>(guildId: string, userId: string, guildMemberBanner: string, format: Format_18): `/guilds/${string}/users/${string}/banners/${string}.${Format_18}`
    }
    RouteBases: {
        readonly api: "https://discord.com/api/v10"
        readonly cdn: "https://cdn.discordapp.com"
        readonly invite: "https://discord.gg"
        readonly template: "https://discord.new"
        readonly gift: "https://discord.gift"
        readonly scheduledEvent: "https://discord.com/events"
    }
    OAuth2Routes: {
        readonly authorizationURL: "https://discord.com/api/v10/oauth2/authorize"
        readonly tokenURL: "https://discord.com/api/v10/oauth2/token"
        readonly tokenRevocationURL: "https://discord.com/api/v10/oauth2/token/revoke"
    }
    RESTJSONErrorCodes: typeof discordjs.RESTJSONErrorCodes
    Locale: typeof discordjs.Locale
    EntitlementOwnerType: typeof discordjs.EntitlementOwnerType
    RPCErrorCodes: typeof discordjs.RPCErrorCodes
    RPCCloseEventCodes: typeof discordjs.RPCCloseEventCodes
    ApplicationCommandNumericOptionMinMaxValueMixin: typeof discordjs.ApplicationCommandNumericOptionMinMaxValueMixin
    ApplicationCommandOptionBase: typeof discordjs.ApplicationCommandOptionBase
    ApplicationCommandOptionChannelTypesMixin: typeof discordjs.ApplicationCommandOptionChannelTypesMixin
    ApplicationCommandOptionWithAutocompleteMixin: typeof discordjs.ApplicationCommandOptionWithAutocompleteMixin
    ApplicationCommandOptionWithChoicesMixin: typeof discordjs.ApplicationCommandOptionWithChoicesMixin
    BaseSelectMenuBuilder: typeof discordjs.BaseSelectMenuBuilder
    ComponentAssertions: typeof discordjs.ComponentAssertions
    ComponentBuilder: typeof discordjs.ComponentBuilder
    ContextMenuCommandAssertions: typeof discordjs.ContextMenuCommandAssertions
    ContextMenuCommandBuilder: typeof discordjs.ContextMenuCommandBuilder
    EmbedAssertions: typeof discordjs.EmbedAssertions
    ModalAssertions: typeof discordjs.ModalAssertions
    SharedNameAndDescription: typeof discordjs.SharedNameAndDescription
    SharedSlashCommand: typeof discordjs.SharedSlashCommand
    SharedSlashCommandOptions: typeof discordjs.SharedSlashCommandOptions
    SharedSlashCommandSubcommands: typeof discordjs.SharedSlashCommandSubcommands
    SlashCommandAssertions: typeof discordjs.SlashCommandAssertions
    SlashCommandAttachmentOption: typeof discordjs.SlashCommandAttachmentOption
    SlashCommandBooleanOption: typeof discordjs.SlashCommandBooleanOption
    SlashCommandBuilder: typeof discordjs.SlashCommandBuilder
    SlashCommandChannelOption: typeof discordjs.SlashCommandChannelOption
    SlashCommandIntegerOption: typeof discordjs.SlashCommandIntegerOption
    SlashCommandMentionableOption: typeof discordjs.SlashCommandMentionableOption
    SlashCommandNumberOption: typeof discordjs.SlashCommandNumberOption
    SlashCommandRoleOption: typeof discordjs.SlashCommandRoleOption
    SlashCommandStringOption: typeof discordjs.SlashCommandStringOption
    SlashCommandSubcommandBuilder: typeof discordjs.SlashCommandSubcommandBuilder
    SlashCommandSubcommandGroupBuilder: typeof discordjs.SlashCommandSubcommandGroupBuilder
    SlashCommandUserOption: typeof discordjs.SlashCommandUserOption
    TextInputAssertions: typeof discordjs.TextInputAssertions
    disableValidators: typeof discordjs.disableValidators
    embedLength: typeof discordjs.embedLength
    enableValidators: typeof discordjs.enableValidators
    isValidationEnabled: typeof discordjs.isValidationEnabled
    normalizeArray: typeof discordjs.normalizeArray
    Faces: typeof discordjs.Faces
    GuildNavigationMentions: typeof discordjs.GuildNavigationMentions
    HeadingLevel: typeof discordjs.HeadingLevel
    TimestampStyles: {
        readonly ShortTime: "t"
        readonly LongTime: "T"
        readonly ShortDate: "d"
        readonly LongDate: "D"
        readonly ShortDateTime: "f"
        readonly LongDateTime: "F"
        readonly RelativeTime: "R"
    }
    blockQuote: typeof discordjs.blockQuote
    bold: typeof discordjs.bold
    channelLink: typeof discordjs.channelLink
    channelMention: typeof discordjs.channelMention
    chatInputApplicationCommandMention: typeof discordjs.chatInputApplicationCommandMention
    codeBlock: typeof discordjs.codeBlock
    escapeBold: typeof discordjs.escapeBold
    escapeBulletedList: typeof discordjs.escapeBulletedList
    escapeCodeBlock: typeof discordjs.escapeCodeBlock
    escapeEscape: typeof discordjs.escapeEscape
    escapeHeading: typeof discordjs.escapeHeading
    escapeInlineCode: typeof discordjs.escapeInlineCode
    escapeItalic: typeof discordjs.escapeItalic
    escapeMarkdown: typeof discordjs.escapeMarkdown
    escapeMaskedLink: typeof discordjs.escapeMaskedLink
    escapeNumberedList: typeof discordjs.escapeNumberedList
    escapeSpoiler: typeof discordjs.escapeSpoiler
    escapeStrikethrough: typeof discordjs.escapeStrikethrough
    escapeUnderline: typeof discordjs.escapeUnderline
    formatEmoji: typeof discordjs.formatEmoji
    heading: typeof discordjs.heading
    hideLinkEmbed: typeof discordjs.hideLinkEmbed
    hyperlink: typeof discordjs.hyperlink
    inlineCode: typeof discordjs.inlineCode
    italic: typeof discordjs.italic
    messageLink: typeof discordjs.messageLink
    orderedList: typeof discordjs.orderedList
    quote: typeof discordjs.quote
    roleMention: typeof discordjs.roleMention
    spoiler: typeof discordjs.spoiler
    strikethrough: typeof discordjs.strikethrough
    time: typeof discordjs.time
    underline: typeof discordjs.underline
    underscore: typeof discordjs.underscore
    unorderedList: typeof discordjs.unorderedList
    userMention: typeof discordjs.userMention
    ALLOWED_EXTENSIONS: readonly ["webp", "png", "jpg", "jpeg", "gif"]
    ALLOWED_SIZES: readonly [16, 32, 64, 128, 256, 512, 1024, 2048, 4096]
    ALLOWED_STICKER_EXTENSIONS: readonly ["png", "json", "gif"]
    BurstHandlerMajorIdKey: "burst"
    CDN: typeof discordjs.CDN
    DEPRECATION_WARNING_PREFIX: "DeprecationWarning"
    DefaultRestOptions: {
        readonly agent: null
        readonly api: "https://discord.com/api"
        readonly authPrefix: "Bot"
        readonly cdn: "https://cdn.discordapp.com"
        readonly headers: {}
        readonly invalidRequestWarningInterval: 0
        readonly globalRequestsPerSecond: 50
        readonly offset: 50
        readonly rejectOnRateLimit: null
        readonly retries: 3
        readonly timeout: 15000
        readonly userAgentAppendix: string
        readonly version: "10"
        readonly hashSweepInterval: 14400000
        readonly hashLifetime: 86400000
        readonly handlerSweepInterval: 3600000
        readonly makeRequest: (url: string, init: import("undici").RequestInit) => Promise<discordjs.ResponseLike>
    }
    DefaultUserAgent: `DiscordBot (https://discord.js.org, ${string})`
    DefaultUserAgentAppendix: string
    DiscordAPIError: typeof discordjs.DiscordAPIError
    HTTPError: typeof discordjs.HTTPError
    OverwrittenMimeTypes: {
        readonly 'image/apng': "image/png"
    }
    REST: typeof discordjs.REST
    RESTEvents: typeof discordjs.RESTEvents
    RateLimitError: typeof discordjs.RateLimitError
    RequestMethod: typeof discordjs.RequestMethod
    calculateUserDefaultAvatarIndex: typeof discordjs.calculateUserDefaultAvatarIndex
    makeURLSearchParams: typeof discordjs.makeURLSearchParams
    parseResponse: typeof discordjs.parseResponse
    calculateShardId: typeof discordjs.calculateShardId
    getUserAgentAppendix: typeof discordjs.getUserAgentAppendix
    isEquatable: typeof discordjs.isEquatable
    isJSONEncodable: typeof discordjs.isJSONEncodable
    lazy: typeof discordjs.lazy
    polyfillDispose: typeof discordjs.polyfillDispose
    range: typeof discordjs.range
    shouldUseGlobalFetchAndWebSocket: typeof discordjs.shouldUseGlobalFetchAndWebSocket
    CloseCodes: typeof discordjs.CloseCodes
    CompressionMethod: typeof discordjs.CompressionMethod
    DefaultDeviceProperty: `@discordjs/ws ${string}`
    DefaultWebSocketManagerOptions: {
        readonly buildIdentifyThrottler: (manager: import("@discordjs/ws").WebSocketManager) => Promise<discordjs.SimpleIdentifyThrottler>
        readonly buildStrategy: (manager: import("@discordjs/ws").WebSocketManager) => discordjs.SimpleShardingStrategy
        readonly shardCount: null
        readonly shardIds: null
        readonly largeThreshold: null
        readonly initialPresence: null
        readonly identifyProperties: {
            readonly browser: `@discordjs/ws ${string}`
            readonly device: `@discordjs/ws ${string}`
            readonly os: NodeJS.Platform
        }
        readonly version: "10"
        readonly encoding: discordjs.Encoding
        readonly compression: null
        readonly retrieveSessionInfo: (shardId: number) => discordjs.SessionInfo
        readonly updateSessionInfo: (shardId: number, info: discordjs.SessionInfo) => void
        readonly handshakeTimeout: 30000
        readonly helloTimeout: 60000
        readonly readyTimeout: 15000
    }
    Encoding: typeof discordjs.Encoding
    ImportantGatewayOpcodes: Set<discordjs.GatewayOpcodes>
    SimpleContextFetchingStrategy: typeof discordjs.SimpleContextFetchingStrategy
    SimpleIdentifyThrottler: typeof discordjs.SimpleIdentifyThrottler
    SimpleShardingStrategy: typeof discordjs.SimpleShardingStrategy
    WebSocketShardDestroyRecovery: typeof discordjs.WebSocketShardDestroyRecovery
    WebSocketShardStatus: typeof discordjs.WebSocketShardStatus
    WorkerBootstrapper: typeof discordjs.WorkerBootstrapper
    WorkerContextFetchingStrategy: typeof discordjs.WorkerContextFetchingStrategy
    WorkerReceivePayloadOp: typeof discordjs.WorkerReceivePayloadOp
    WorkerSendPayloadOp: typeof discordjs.WorkerSendPayloadOp
    WorkerShardingStrategy: typeof discordjs.WorkerShardingStrategy
    getInitialSendRateLimitState: typeof discordjs.getInitialSendRateLimitState
    managerToFetchingStrategyOptions: typeof discordjs.managerToFetchingStrategyOptions
}
export default output