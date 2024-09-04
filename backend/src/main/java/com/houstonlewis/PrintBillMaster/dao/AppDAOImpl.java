package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class AppDAOImpl implements AppDAO {

    private static final Logger logger = Logger.getLogger(AppDAOImpl.class.getName());

    private final RowMapper<PriceProfile> mapper = (rs, rowNum) -> new PriceProfile(
            getString(rs, "id"),
            getString(rs, "name"),
            getString(rs, "bw_price"),
            getString(rs, "color_price"),
            getString(rs, "paper_price"),
            getString(rs, "is_active")
    );

    private final JdbcTemplate jdbcTemplate;

    public AppDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public PriceProfile getPriceProfile() {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM prices WHERE is_active=1", mapper);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public List<PriceProfile> getPriceProfileList() {
        try {
            return jdbcTemplate.query("SELECT * FROM prices", mapper);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean setPriceProfile(String id) {
        try {
            return jdbcTemplate.update("UPDATE prices SET is_active=IF(id != ?, 0 ,1);", id) != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean addPriceProfile(PriceProfile profile) {
        try {
            return jdbcTemplate.update("INSERT INTO prices (name, bw_price, color_price, paper_price) VALUES (?,?,?,?)", profile.getName(), profile.getBw_price(), profile.getColor_price(), profile.getPaper_price()) != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updatePriceProfile(PriceProfile profile) {
        try {
            return jdbcTemplate.update("UPDATE prices SET name=?, bw_price=?, color_price=? , paper_price=? WHERE id=?", profile.getName(), profile.getBw_price(), profile.getColor_price(), profile.getPaper_price(), profile.getId()) != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }
}
