import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LangModule } from './lang/lang.module';
import { Lang } from './lang/models/lang.model';
import { HumanCategoryModule } from './human_category/human_category.module';
import { HumanCategory } from './human_category/models/human_category.model';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { SeatType } from './seat_type/models/seat_type.model';
import { TicketStatusModule } from './ticket_status/ticket_status.module';
import { TicketStatus } from './ticket_status/models/ticket_status.model';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { DeliveryMethod } from './delivery_method/models/delivery_method.model';
import { PaymentMethod } from './payment_method/models/payment_method.model';
import { VenueType } from './venue_type/models/venue_type.model';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { VenueModule } from './venue/venue.module';
import { Venue } from './venue/models/venue.model';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { VenuePhoto } from './venue_photo/models/venue_photo.model';
import { VenueVenueTypeModule } from './venue_venue_type/venue_venue_type.module';
import { VenueVenueType } from './venue_venue_type/models/venue_venue_type.model';
import { SeatModule } from './seat/seat.module';
import { Seat } from './seat/models/seat.model';
import { EventTypeModule } from './event_type/event_type.module';
import { EventType } from './event_type/models/event_type.model';
import { EventModule } from './event/event.module';
import { Event } from './event/models/event.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/roles.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { UserRole } from './users/models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/models/ticket.model';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/models/customer.model';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { CustomerAddress } from './customer_address/models/customer_address.model';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CustomerCard } from './customer_card/models/customer_card.model';
import { CardModule } from './card/card.module';
import { CardStatusModule } from './card_status/card_status.module';
import { Card } from './card/models/card.model';
import { CardItemModule } from './card_item/card_item.module';
import { CardItem } from './card_item/models/card_item.model';
import { CardStatus } from './card_status/models/card_status.model';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/models/booking.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Lang,
        HumanCategory,
        SeatType,
        TicketStatus,
        DeliveryMethod,
        PaymentMethod,
        VenueType,
        Region,
        District,
        Venue,
        VenuePhoto,
        VenueVenueType,
        Seat,
        EventType,
        Event,
        Role,
        User,
        UserRole,
        Ticket,
        Customer,
        CustomerAddress,
        CustomerCard,
        Card,
        CardItem,
        CardStatus,
        Booking,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    LangModule,
    HumanCategoryModule,
    SeatTypeModule,
    TicketStatusModule,
    VenueTypeModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    RegionModule,
    DistrictModule,
    VenueModule,
    VenuePhotoModule,
    VenueVenueTypeModule,
    SeatModule,
    EventTypeModule,
    EventModule,
    RolesModule,
    UsersModule,
    AuthModule,
    TicketModule,
    CustomerModule,
    CustomerAddressModule,
    CustomerCardModule,
    CardModule,
    CardStatusModule,
    CardItemModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
